'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  Home, 
  Gamepad2, 
  Music, 
  Palette, 
  Users, 
  Heart,
  ChevronDown,
  ChevronRight,
  Crown,
  Star
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useAuth } from '@/lib/hooks/use-auth'
import { useSocket } from '@/app/providers'

const categories = [
  { name: 'Gaming', icon: Gamepad2, count: '1.2M' },
  { name: 'Music', icon: Music, count: '450K' },
  { name: 'Art', icon: Palette, count: '230K' },
  { name: 'Just Chatting', icon: Users, count: '890K' },
]

interface LiveStream {
  id: string
  title: string
  streamer: string
  avatar: string
  viewers: string
  category: string
  isLive: boolean
  streamerId: string
}

interface OfflineChannel {
  id: string
  username: string
  avatar: string
  bio?: string
  followers: number
  isLive: boolean
}

export function Sidebar() {
  const [isFollowedExpanded, setIsFollowedExpanded] = useState(true)
  const [liveStreams, setLiveStreams] = useState<LiveStream[]>([])
  const [offlineChannels, setOfflineChannels] = useState<OfflineChannel[]>([])
  const [loading, setLoading] = useState(true)
  const { user, isAuthenticated } = useAuth()
  const { socket, isConnected } = useSocket()

  // Fetch followed channels
  useEffect(() => {
    const fetchFollowedChannels = async () => {
      if (!isAuthenticated) {
        setLoading(false)
        return
      }

      try {
        const response = await fetch('/api/users/following')
        if (response.ok) {
          const data = await response.json()
          setLiveStreams(data.liveStreams || [])
          setOfflineChannels(data.offlineChannels || [])
        }
      } catch (error) {
        console.error('Error fetching followed channels:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchFollowedChannels()
  }, [isAuthenticated])

  // Listen for real-time stream updates
  useEffect(() => {
    if (!socket || !isConnected) return

    const handleStreamStarted = (data: { streamId: string; streamerId: string; streamer: string; title: string; category: string; avatar: string }) => {
      // Move channel from offline to live
      setOfflineChannels(prev => prev.filter(channel => channel.id !== data.streamerId))
      
      setLiveStreams(prev => {
        // Check if already in live streams
        if (prev.some(stream => stream.streamerId === data.streamerId)) {
          return prev
        }
        
        return [{
          id: data.streamId,
          title: data.title,
          streamer: data.streamer,
          avatar: data.avatar,
          viewers: '0',
          category: data.category,
          isLive: true,
          streamerId: data.streamerId
        }, ...prev]
      })
    }

    const handleStreamEnded = (data: { streamId: string; streamerId: string; streamer: string; avatar: string; followers: number }) => {
      // Move channel from live to offline
      setLiveStreams(prev => prev.filter(stream => stream.streamerId !== data.streamerId))
      
      setOfflineChannels(prev => {
        // Check if already in offline channels
        if (prev.some(channel => channel.id === data.streamerId)) {
          return prev
        }
        
        return [...prev, {
          id: data.streamerId,
          username: data.streamer,
          avatar: data.avatar,
          followers: data.followers,
          isLive: false
        }].sort((a, b) => a.username.localeCompare(b.username))
      })
    }

    const handleViewerCountUpdate = (data: { streamId: string; action: 'join' | 'leave' }) => {
      setLiveStreams(prev => prev.map(stream => {
        if (stream.id === data.streamId) {
          const currentViewers = parseInt(stream.viewers.replace(/,/g, ''))
          const newViewers = data.action === 'join' ? currentViewers + 1 : Math.max(0, currentViewers - 1)
          return {
            ...stream,
            viewers: newViewers.toLocaleString()
          }
        }
        return stream
      }))
    }

    socket.on('stream_started', handleStreamStarted)
    socket.on('stream_ended', handleStreamEnded)
    socket.on('viewer_count_update', handleViewerCountUpdate)

    return () => {
      socket.off('stream_started', handleStreamStarted)
      socket.off('stream_ended', handleStreamEnded)
      socket.off('viewer_count_update', handleViewerCountUpdate)
    }
  }, [socket, isConnected])

  const totalFollowedChannels = liveStreams.length + offlineChannels.length

  return (
    <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 border-r bg-background overflow-y-auto">
      <div className="p-4 space-y-6">
        {/* Navigation */}
        <nav className="space-y-2">
          <Link
            href="/"
            className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-accent transition-colors"
          >
            <Home className="w-5 h-5" />
            <span>Home</span>
          </Link>
          <Link
            href="/following"
            className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-accent transition-colors"
          >
            <Heart className="w-5 h-5" />
            <span>Following</span>
          </Link>
        </nav>

        {/* Categories */}
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground mb-3 px-3">
            BROWSE
          </h3>
          <nav className="space-y-1">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={`/category/${category.name.toLowerCase().replace(' ', '-')}`}
                className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-accent transition-colors group"
              >
                <div className="flex items-center space-x-3">
                  <category.icon className="w-5 h-5" />
                  <span>{category.name}</span>
                </div>
                <span className="text-xs text-muted-foreground group-hover:text-foreground">
                  {category.count}
                </span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Followed Channels */}
        {isAuthenticated && (
          <div>
            <button
              onClick={() => setIsFollowedExpanded(!isFollowedExpanded)}
              className="flex items-center justify-between w-full px-3 py-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
            >
              <span>FOLLOWED CHANNELS {totalFollowedChannels > 0 && `(${totalFollowedChannels})`}</span>
              {isFollowedExpanded ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </button>
            
            {isFollowedExpanded && (
              <div className="space-y-1 mt-2">
                {loading ? (
                  <div className="px-3 py-2 text-sm text-muted-foreground">
                    Loading...
                  </div>
                ) : (
                  <>
                    {/* Live Streams */}
                    {liveStreams.map((stream) => (
                      <Link
                        key={stream.id}
                        href={`/${stream.streamer}`}
                        className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-accent transition-colors group"
                      >
                        <div className="relative">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={stream.avatar} />
                            <AvatarFallback>{stream.streamer[0]}</AvatarFallback>
                          </Avatar>
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-background" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-1">
                            <span className="text-sm font-medium truncate">
                              {stream.streamer}
                            </span>
                            <div className="flex items-center space-x-1">
                              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                              <span className="text-xs text-muted-foreground">
                                {stream.viewers}
                              </span>
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground truncate">
                            {stream.category}
                          </p>
                        </div>
                      </Link>
                    ))}

                    {/* Offline Channels */}
                    {offlineChannels.map((channel) => (
                      <Link
                        key={channel.id}
                        href={`/${channel.username}`}
                        className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-accent transition-colors group opacity-60 hover:opacity-100"
                      >
                        <div className="relative">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={channel.avatar} />
                            <AvatarFallback>{channel.username[0]}</AvatarFallback>
                          </Avatar>
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-sm font-medium truncate block">
                            {channel.username}
                          </span>
                          <p className="text-xs text-muted-foreground">
                            Offline
                          </p>
                        </div>
                      </Link>
                    ))}

                    {/* Empty State */}
                    {totalFollowedChannels === 0 && (
                      <div className="px-3 py-4 text-center">
                        <p className="text-sm text-muted-foreground mb-2">
                          No followed channels yet
                        </p>
                        <Link 
                          href="/"
                          className="text-xs text-stream-purple hover:underline"
                        >
                          Discover streamers
                        </Link>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        )}

        {/* Login prompt for non-authenticated users */}
        {!isAuthenticated && (
          <div className="px-3 py-4 text-center border rounded-lg">
            <p className="text-sm text-muted-foreground mb-2">
              Sign in to follow your favorite streamers
            </p>
            <Link 
              href="/auth/signin"
              className="text-sm text-stream-purple hover:underline"
            >
              Sign In
            </Link>
          </div>
        )}
      </div>
    </aside>
  )
}
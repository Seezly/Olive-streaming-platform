'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/lib/hooks/use-auth'
import { redirect } from 'next/navigation'
import { Header } from '@/components/layout/header'
import { Sidebar } from '@/components/layout/sidebar'
import { StreamCard } from '@/components/stream/stream-card'
import { UserCard } from '@/components/user/user-card'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface LiveStream {
  id: string
  title: string
  streamer: string
  avatar: string
  thumbnail: string
  viewers: string
  category: string
  isLive: boolean
  tags: string[]
}

interface OfflineChannel {
  id: string
  username: string
  avatar?: string
  bio?: string
  followers: number
  isLive: boolean
}

export default function FollowingPage() {
  const { user, isLoading, isAuthenticated } = useAuth()
  const [liveStreams, setLiveStreams] = useState<LiveStream[]>([])
  const [offlineChannels, setOfflineChannels] = useState<OfflineChannel[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (isLoading) return

    if (!isAuthenticated) {
      redirect('/auth/signin')
      return
    }

    const fetchFollowedContent = async () => {
      try {
        const response = await fetch('/api/users/following')
        if (response.ok) {
          const data = await response.json()
          setLiveStreams(data.liveStreams || [])
          setOfflineChannels(data.offlineChannels || [])
        } else {
          console.error('Failed to fetch followed content')
        }
      } catch (error) {
        console.error('Error fetching followed content:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchFollowedContent()
  }, [isAuthenticated, isLoading])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 ml-64">
          <div className="max-w-7xl mx-auto space-y-6">
            <div>
              <h1 className="text-3xl font-bold">Following</h1>
              <p className="text-muted-foreground mt-2">
                Keep up with your favorite streamers and creators
              </p>
            </div>

            {loading ? (
              <div className="flex justify-center py-12">
                <LoadingSpinner size="lg" />
              </div>
            ) : (
              <Tabs defaultValue="live" className="w-full">
                <TabsList>
                  <TabsTrigger value="live">
                    Live Now ({liveStreams.length})
                  </TabsTrigger>
                  <TabsTrigger value="offline">
                    Offline ({offlineChannels.length})
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="live" className="space-y-6">
                  {liveStreams.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {liveStreams.map((stream) => (
                        <StreamCard key={stream.id} stream={stream} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="max-w-md mx-auto">
                        <h3 className="text-lg font-semibold mb-2">No live streams</h3>
                        <p className="text-muted-foreground mb-4">
                          None of the channels you follow are currently live. Check back later or discover new streamers!
                        </p>
                        <a 
                          href="/"
                          className="text-stream-purple hover:underline"
                        >
                          Browse live streams
                        </a>
                      </div>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="offline" className="space-y-6">
                  {offlineChannels.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {offlineChannels.map((channel) => (
                        <UserCard key={channel.id} user={channel} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="max-w-md mx-auto">
                        <h3 className="text-lg font-semibold mb-2">No followed channels</h3>
                        <p className="text-muted-foreground mb-4">
                          You haven't followed any channels yet. Start following your favorite streamers to see them here!
                        </p>
                        <a 
                          href="/"
                          className="text-stream-purple hover:underline"
                        >
                          Discover streamers
                        </a>
                      </div>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
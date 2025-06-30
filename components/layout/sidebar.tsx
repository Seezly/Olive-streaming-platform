'use client'

import { useState } from 'react'
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

const categories = [
  { name: 'Gaming', icon: Gamepad2, count: '1.2M' },
  { name: 'Music', icon: Music, count: '450K' },
  { name: 'Art', icon: Palette, count: '230K' },
  { name: 'Just Chatting', icon: Users, count: '890K' },
]

const followedChannels = [
  {
    id: '1',
    name: 'GamerPro123',
    avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=1',
    isLive: true,
    viewers: '12.5K',
    game: 'Valorant'
  },
  {
    id: '2',
    name: 'ArtistMike',
    avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=1',
    isLive: true,
    viewers: '3.2K',
    game: 'Digital Art'
  },
  {
    id: '3',
    name: 'MusicMaven',
    avatar: 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=1',
    isLive: false,
    viewers: '0',
    game: 'Music Production'
  },
]

export function Sidebar() {
  const [isFollowedExpanded, setIsFollowedExpanded] = useState(true)

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
        <div>
          <button
            onClick={() => setIsFollowedExpanded(!isFollowedExpanded)}
            className="flex items-center justify-between w-full px-3 py-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
          >
            <span>FOLLOWED CHANNELS</span>
            {isFollowedExpanded ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </button>
          
          {isFollowedExpanded && (
            <div className="space-y-1 mt-2">
              {followedChannels.map((channel) => (
                <Link
                  key={channel.id}
                  href={`/${channel.name}`}
                  className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-accent transition-colors group"
                >
                  <div className="relative">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={channel.avatar} />
                      <AvatarFallback>{channel.name[0]}</AvatarFallback>
                    </Avatar>
                    {channel.isLive && (
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-background" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-1">
                      <span className="text-sm font-medium truncate">
                        {channel.name}
                      </span>
                      {channel.isLive && (
                        <div className="flex items-center space-x-1">
                          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                          <span className="text-xs text-muted-foreground">
                            {channel.viewers}
                          </span>
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground truncate">
                      {channel.game}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}
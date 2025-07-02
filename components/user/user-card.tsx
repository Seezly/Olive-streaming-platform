'use client'

import Link from 'next/link'
import { Users, Heart } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

interface UserCardProps {
  user: {
    id: string
    username: string
    avatar?: string
    bio?: string
    followers: number
    isLive?: boolean
  }
}

export function UserCard({ user }: UserCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300">
      <CardContent className="p-6">
        <Link href={`/${user.username}`} className="block">
          <div className="flex items-center space-x-4 mb-4">
            <div className="relative">
              <Avatar className="w-16 h-16">
                <AvatarImage src={user.avatar} />
                <AvatarFallback className="text-lg">{user.username[0]?.toUpperCase()}</AvatarFallback>
              </Avatar>
              {user.isLive && (
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-background" />
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-lg group-hover:text-stream-purple transition-colors">
                {user.username}
              </h3>
              <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                <Users className="w-4 h-4" />
                <span>{user.followers.toLocaleString()} followers</span>
              </div>
            </div>
          </div>
          
          {user.bio && (
            <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
              {user.bio}
            </p>
          )}
        </Link>
        
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 mr-2"
          >
            <Heart className="w-4 h-4 mr-2" />
            Follow
          </Button>
          <Button
            variant="ghost"
            size="sm"
            asChild
          >
            <Link href={`/${user.username}`}>
              View Channel
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
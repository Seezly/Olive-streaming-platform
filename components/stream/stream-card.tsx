'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Eye, Users } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface StreamCardProps {
  stream: {
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
}

export function StreamCard({ stream }: StreamCardProps) {
  return (
    <Link href={`/${stream.streamer}`} className="group block">
      <div className="space-y-3">
        {/* Thumbnail */}
        <div className="relative aspect-video rounded-lg overflow-hidden bg-muted">
          <Image
            src={stream.thumbnail}
            alt={stream.title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
          
          {/* Live indicator */}
          {stream.isLive && (
            <div className="absolute top-2 left-2">
              <Badge className="bg-red-600 hover:bg-red-600 text-white live-indicator">
                LIVE
              </Badge>
            </div>
          )}
          
          {/* Viewer count */}
          <div className="absolute bottom-2 left-2">
            <div className="bg-black/70 text-white px-2 py-1 rounded text-sm flex items-center space-x-1">
              <Eye className="w-3 h-3" />
              <span>{stream.viewers}</span>
            </div>
          </div>
          
          {/* Tags */}
          <div className="absolute bottom-2 right-2 flex flex-wrap gap-1">
            {stream.tags.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs bg-black/70 text-white">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Stream info */}
        <div className="space-y-2">
          <div className="flex items-start space-x-3">
            <Avatar className="w-10 h-10 flex-shrink-0">
              <AvatarImage src={stream.avatar} />
              <AvatarFallback>{stream.streamer[0]}</AvatarFallback>
            </Avatar>
            
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-stream-purple transition-colors">
                {stream.title}
              </h3>
              <p className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                {stream.streamer}
              </p>
              <p className="text-sm text-muted-foreground">
                {stream.category}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
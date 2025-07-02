'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Maximize, 
  Volume2, 
  VolumeX, 
  Settings,
  Eye,
  Users
} from 'lucide-react'

interface StreamPreviewProps {
  streamData: {
    id: string
    title: string
    streamer: string
    category: string
    viewers: number
  }
}

export function StreamPreview({ streamData }: StreamPreviewProps) {
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Stream Preview</CardTitle>
            <CardDescription>Live preview of your broadcast</CardDescription>
          </div>
          <Badge variant="destructive" className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            <span>LIVE</span>
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Video Preview */}
          <div className="relative aspect-video bg-black rounded-lg overflow-hidden group">
            {/* Placeholder for actual video stream */}
            <div className="absolute inset-0 bg-gradient-to-br from-stream-purple to-stream-purple-dark flex items-center justify-center">
              <div className="text-center text-white">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <Eye className="w-8 h-8" />
                </div>
                <p className="text-lg font-semibold">Stream Preview</p>
                <p className="text-sm opacity-80">Your live broadcast preview</p>
              </div>
            </div>

            {/* Live Indicator */}
            <div className="absolute top-4 left-4">
              <Badge variant="destructive" className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                <span>LIVE</span>
              </Badge>
            </div>

            {/* Viewer Count */}
            <div className="absolute top-4 right-4">
              <div className="bg-black/70 text-white px-3 py-1 rounded-full text-sm flex items-center space-x-1">
                <Users className="w-3 h-3" />
                <span>{streamData.viewers.toLocaleString()}</span>
              </div>
            </div>

            {/* Controls */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="flex items-center space-x-2">
                <Button size="icon" variant="secondary" onClick={toggleMute}>
                  {isMuted ? (
                    <VolumeX className="w-4 h-4" />
                  ) : (
                    <Volume2 className="w-4 h-4" />
                  )}
                </Button>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button size="icon" variant="secondary">
                  <Settings className="w-4 h-4" />
                </Button>
                <Button size="icon" variant="secondary" onClick={toggleFullscreen}>
                  <Maximize className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Stream Info */}
          <div className="space-y-2">
            <h3 className="font-semibold text-lg">{streamData.title}</h3>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span>{streamData.category}</span>
              <span>•</span>
              <span>{streamData.viewers.toLocaleString()} viewers</span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" className="flex-1">
              Update Title
            </Button>
            <Button variant="outline" size="sm" className="flex-1">
              Change Category
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
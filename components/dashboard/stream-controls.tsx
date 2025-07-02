'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Square, 
  Pause, 
  Play, 
  Settings, 
  Users, 
  Eye, 
  Clock,
  AlertCircle
} from 'lucide-react'
import { useSocket } from '@/app/providers'

interface StreamControlsProps {
  streamData: {
    id: string
    title: string
    streamer: string
    streamerId: string
    avatar: string
    category: string
    viewers: number
    startedAt?: Date
  }
  onStreamEnd: () => void
}

export function StreamControls({ streamData, onStreamEnd }: StreamControlsProps) {
  const [isEnding, setIsEnding] = useState(false)
  const [streamTime, setStreamTime] = useState('00:00:00')
  const { socket } = useSocket()

  const handleEndStream = async () => {
    setIsEnding(true)
    
    try {
      // Emit stream end event via socket
      if (socket) {
        socket.emit('stream_end', {
          streamId: streamData.id,
          streamerId: streamData.streamerId,
          streamer: streamData.streamer,
          avatar: streamData.avatar,
          followers: 1234 // This would come from actual user data
        })
      }

      // Call API to end stream
      const response = await fetch(`/api/streams/${streamData.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          isLive: false,
          endedAt: new Date().toISOString()
        })
      })

      if (response.ok) {
        onStreamEnd()
      }
    } catch (error) {
      console.error('Error ending stream:', error)
    } finally {
      setIsEnding(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Stream Status */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
              <span>Live Stream Active</span>
            </CardTitle>
            <Badge variant="destructive">LIVE</Badge>
          </div>
          <CardDescription>Your stream is currently broadcasting</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-lg mb-2 mx-auto">
                <Eye className="w-6 h-6 text-red-600" />
              </div>
              <p className="text-2xl font-bold">{streamData.viewers.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Current Viewers</p>
            </div>
            
            <div>
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-2 mx-auto">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <p className="text-2xl font-bold">1,234</p>
              <p className="text-sm text-muted-foreground">Peak Viewers</p>
            </div>
            
            <div>
              <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mb-2 mx-auto">
                <Clock className="w-6 h-6 text-green-600" />
              </div>
              <p className="text-2xl font-bold">{streamTime}</p>
              <p className="text-sm text-muted-foreground">Stream Time</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stream Controls */}
      <Card>
        <CardHeader>
          <CardTitle>Stream Controls</CardTitle>
          <CardDescription>Manage your live stream</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <Button variant="outline" className="flex-1">
              <Settings className="w-4 h-4 mr-2" />
              Stream Settings
            </Button>
            <Button variant="outline" className="flex-1">
              <Pause className="w-4 h-4 mr-2" />
              Pause Stream
            </Button>
          </div>
          
          <div className="border-t pt-4">
            <div className="flex items-center space-x-2 mb-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <AlertCircle className="w-5 h-5 text-yellow-600" />
              <p className="text-sm text-yellow-800">
                Ending your stream will disconnect all viewers and stop the broadcast.
              </p>
            </div>
            
            <Button 
              variant="destructive" 
              className="w-full"
              onClick={handleEndStream}
              disabled={isEnding}
            >
              <Square className="w-4 h-4 mr-2" />
              {isEnding ? 'Ending Stream...' : 'End Stream'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stream Info */}
      <Card>
        <CardHeader>
          <CardTitle>Stream Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Title</p>
            <p className="font-medium">{streamData.title}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Category</p>
            <p className="font-medium">{streamData.category}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Stream Key</p>
            <p className="font-mono text-sm bg-muted p-2 rounded">sk_***************</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
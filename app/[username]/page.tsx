'use client'

import { useState, useEffect } from 'react'
import { StreamPlayer } from '@/components/stream/stream-player'
import { StreamChat } from '@/components/stream/stream-chat'
import { StreamInfo } from '@/components/stream/stream-info'
import { Header } from '@/components/layout/header'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

interface StreamPageProps {
  params: {
    username: string
  }
}

// Mock stream data
const mockStreamData = {
  id: '1',
  title: 'Valorant Ranked Grind - Road to Radiant! 🎯',
  streamer: 'ProGamer2024',
  avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=1',
  streamUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  viewers: 12543,
  followers: 89234,
  category: 'Valorant',
  tags: ['FPS', 'Competitive', 'English', 'Educational'],
  isLive: true,
  description: 'Climbing the ranked ladder with educational commentary! Drop a follow if you enjoy the content. Today we\'re focusing on aim training and game sense improvement.',
  socialLinks: {
    twitter: 'https://twitter.com/progamer2024',
    youtube: 'https://youtube.com/progamer2024',
    discord: 'https://discord.gg/progamer2024'
  }
}

export default function StreamPage({ params }: StreamPageProps) {
  const [streamData, setStreamData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call to fetch stream data
    const timer = setTimeout(() => {
      setStreamData(mockStreamData)
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [params.username])

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    )
  }

  if (!streamData) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">Stream Not Found</h1>
            <p className="text-muted-foreground">This stream may be offline or doesn't exist.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Video Player */}
          <div className="aspect-video bg-black">
            <StreamPlayer streamData={streamData} />
          </div>
          
          {/* Stream Info */}
          <div className="flex-1 p-6">
            <StreamInfo streamData={streamData} />
          </div>
        </div>

        {/* Chat Sidebar */}
        <div className="w-80 border-l">
          <StreamChat streamData={streamData} />
        </div>
      </div>
    </div>
  )
}
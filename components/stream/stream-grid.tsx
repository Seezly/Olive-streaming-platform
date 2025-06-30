'use client'

import { useState, useEffect } from 'react'
import { StreamCard } from './stream-card'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

interface Stream {
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

// Mock data - in a real app, this would come from an API
const mockStreams: Stream[] = [
  {
    id: '1',
    title: 'Valorant Ranked Grind - Road to Radiant!',
    streamer: 'ProGamer2024',
    avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=1',
    thumbnail: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=400&h=225&dpr=1',
    viewers: '12.5K',
    category: 'Valorant',
    isLive: true,
    tags: ['FPS', 'Competitive', 'English']
  },
  {
    id: '2',
    title: 'Chill Music Production Stream 🎵',
    streamer: 'BeatMaker',
    avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=1',
    thumbnail: 'https://images.pexels.com/photos/1751731/pexels-photo-1751731.jpeg?auto=compress&cs=tinysrgb&w=400&h=225&dpr=1',
    viewers: '3.2K',
    category: 'Music & Performing Arts',
    isLive: true,
    tags: ['Music', 'Chill', 'Creative']
  },
  {
    id: '3',
    title: 'Digital Art Commission Work',
    streamer: 'ArtistAnna',
    avatar: 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=1',
    thumbnail: 'https://images.pexels.com/photos/1183992/pexels-photo-1183992.jpeg?auto=compress&cs=tinysrgb&w=400&h=225&dpr=1',
    viewers: '1.8K',
    category: 'Art',
    isLive: true,
    tags: ['Art', 'Digital', 'Commission']
  },
  {
    id: '4',
    title: 'Just Chatting with Viewers - AMA!',
    streamer: 'ChatMaster',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=1',
    thumbnail: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=400&h=225&dpr=1',
    viewers: '5.7K',
    category: 'Just Chatting',
    isLive: true,
    tags: ['Chat', 'AMA', 'Community']
  },
  {
    id: '5',
    title: 'Minecraft Hardcore Survival Day 100',
    streamer: 'MinecraftMaster',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=1',
    thumbnail: 'https://images.pexels.com/photos/1298601/pexels-photo-1298601.jpeg?auto=compress&cs=tinysrgb&w=400&h=225&dpr=1',
    viewers: '8.9K',
    category: 'Minecraft',
    isLive: true,
    tags: ['Minecraft', 'Hardcore', 'Survival']
  },
  {
    id: '6',
    title: 'League of Legends Ranked Climb',
    streamer: 'LeagueChamp',
    avatar: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=1',
    thumbnail: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=400&h=225&dpr=1',
    viewers: '15.2K',
    category: 'League of Legends',
    isLive: true,
    tags: ['MOBA', 'Ranked', 'Educational']
  }
]

export function StreamGrid() {
  const [streams, setStreams] = useState<Stream[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setStreams(mockStreams)
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {streams.map((stream) => (
        <StreamCard key={stream.id} stream={stream} />
      ))}
    </div>
  )
}
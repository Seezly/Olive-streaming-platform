'use client'

import { useState, useEffect } from 'react'
import { StreamCard } from './stream-card'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

// Mock featured streams data
const featuredStreams = [
  {
    id: 'featured-1',
    title: '🏆 WORLD CHAMPIONSHIP FINALS - Epic Showdown!',
    streamer: 'EsportsOfficial',
    avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=1',
    thumbnail: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=400&h=225&dpr=1',
    viewers: '125K',
    category: 'Esports',
    isLive: true,
    tags: ['Tournament', 'Championship', 'Featured']
  },
  {
    id: 'featured-2',
    title: 'Celebrity Guest Stream - Special Event!',
    streamer: 'CelebStreamer',
    avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=1',
    thumbnail: 'https://images.pexels.com/photos/1751731/pexels-photo-1751731.jpeg?auto=compress&cs=tinysrgb&w=400&h=225&dpr=1',
    viewers: '89K',
    category: 'Special Events',
    isLive: true,
    tags: ['Celebrity', 'Special', 'Featured']
  },
  {
    id: 'featured-3',
    title: '24 Hour Charity Marathon Stream 💝',
    streamer: 'CharityChamp',
    avatar: 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=1',
    thumbnail: 'https://images.pexels.com/photos/1183992/pexels-photo-1183992.jpeg?auto=compress&cs=tinysrgb&w=400&h=225&dpr=1',
    viewers: '45K',
    category: 'Charity',
    isLive: true,
    tags: ['Charity', 'Marathon', 'Community']
  }
]

export function FeaturedStreams() {
  const [streams, setStreams] = useState(featuredStreams)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {streams.map((stream) => (
        <div key={stream.id} className="relative">
          <div className="absolute -top-2 -left-2 z-10">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-3 py-1 rounded-full text-xs font-bold">
              ⭐ FEATURED
            </div>
          </div>
          <StreamCard stream={stream} />
        </div>
      ))}
    </div>
  )
}
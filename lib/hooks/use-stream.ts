import { useState, useEffect } from 'react'
import { useSocket } from '@/app/providers'

interface StreamData {
  id: string
  title: string
  streamer: string
  viewers: number
  isLive: boolean
}

export function useStream(streamId: string) {
  const [streamData, setStreamData] = useState<StreamData | null>(null)
  const [loading, setLoading] = useState(true)
  const { socket } = useSocket()

  useEffect(() => {
    // Fetch initial stream data
    const fetchStream = async () => {
      try {
        const response = await fetch(`/api/streams/${streamId}`)
        if (response.ok) {
          const data = await response.json()
          setStreamData(data)
        }
      } catch (error) {
        console.error('Error fetching stream:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStream()

    // Listen for real-time updates
    if (socket) {
      socket.on('viewer_count_update', (data) => {
        if (data.streamId === streamId) {
          setStreamData(prev => prev ? {
            ...prev,
            viewers: data.action === 'join' ? prev.viewers + 1 : prev.viewers - 1
          } : null)
        }
      })

      socket.on('stream_ended', (data) => {
        if (data.streamId === streamId) {
          setStreamData(prev => prev ? { ...prev, isLive: false } : null)
        }
      })
    }

    return () => {
      if (socket) {
        socket.off('viewer_count_update')
        socket.off('stream_ended')
      }
    }
  }, [streamId, socket])

  return { streamData, loading }
}
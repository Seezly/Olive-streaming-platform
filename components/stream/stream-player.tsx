'use client'

import { useState, useRef, useEffect } from 'react'
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Settings,
  Heart,
  Share2
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'

interface StreamPlayerProps {
  streamData: {
    id: string
    title: string
    streamer: string
    streamUrl: string
    viewers: number
    isLive: boolean
  }
}

export function StreamPlayer({ streamData }: StreamPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState([50])
  const [showControls, setShowControls] = useState(false)
  const [isFollowing, setIsFollowing] = useState(false)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume[0] / 100
    }
  }, [volume])

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen()
      } else {
        videoRef.current.requestFullscreen()
      }
    }
  }

  const handleFollow = () => {
    setIsFollowing(!isFollowing)
    // Here you would typically make an API call to follow/unfollow
  }

  return (
    <div 
      className="relative w-full h-full group bg-black"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        src={streamData.streamUrl}
        poster="https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=1200&h=675&dpr=1"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {/* Live Indicator */}
      {streamData.isLive && (
        <div className="absolute top-4 left-4 z-20">
          <div className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center space-x-2">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            <span>LIVE</span>
          </div>
        </div>
      )}

      {/* Viewer Count */}
      <div className="absolute top-4 right-4 z-20">
        <div className="bg-black/70 text-white px-3 py-1 rounded-full text-sm flex items-center space-x-1">
          <div className="w-2 h-2 bg-red-500 rounded-full" />
          <span>{streamData.viewers.toLocaleString()} viewers</span>
        </div>
      </div>

      {/* Stream Actions */}
      <div className="absolute top-16 right-4 z-20 flex flex-col space-y-2">
        <Button
          size="icon"
          variant={isFollowing ? "default" : "secondary"}
          onClick={handleFollow}
          className={`${isFollowing ? 'bg-stream-purple hover:bg-stream-purple-dark' : ''} follow-btn`}
        >
          <Heart className={`w-4 h-4 ${isFollowing ? 'fill-current' : ''}`} />
        </Button>
        <Button size="icon" variant="secondary">
          <Share2 className="w-4 h-4" />
        </Button>
      </div>

      {/* Video Controls */}
      <div 
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity duration-300 ${
          showControls ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="flex items-center space-x-4">
          {/* Play/Pause */}
          <Button size="icon" variant="ghost" onClick={togglePlay}>
            {isPlaying ? (
              <Pause className="w-5 h-5 text-white" />
            ) : (
              <Play className="w-5 h-5 text-white" />
            )}
          </Button>

          {/* Volume */}
          <div className="flex items-center space-x-2">
            <Button size="icon" variant="ghost" onClick={toggleMute}>
              {isMuted ? (
                <VolumeX className="w-5 h-5 text-white" />
              ) : (
                <Volume2 className="w-5 h-5 text-white" />
              )}
            </Button>
            <div className="w-20">
              <Slider
                value={volume}
                onValueChange={setVolume}
                max={100}
                step={1}
                className="cursor-pointer"
              />
            </div>
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Settings */}
          <Button size="icon" variant="ghost">
            <Settings className="w-5 h-5 text-white" />
          </Button>

          {/* Fullscreen */}
          <Button size="icon" variant="ghost" onClick={toggleFullscreen}>
            <Maximize className="w-5 h-5 text-white" />
          </Button>
        </div>
      </div>

      {/* Loading/Offline State */}
      {!streamData.isLive && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <div className="text-center text-white">
            <h3 className="text-xl font-semibold mb-2">Stream Offline</h3>
            <p className="text-gray-300">This streamer is currently offline</p>
          </div>
        </div>
      )}
    </div>
  )
}
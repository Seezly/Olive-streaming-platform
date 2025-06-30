'use client'

import { useState } from 'react'
import { Heart, Share2, Users, Calendar, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface StreamInfoProps {
  streamData: {
    id: string
    title: string
    streamer: string
    avatar: string
    viewers: number
    followers: number
    category: string
    tags: string[]
    description: string
    socialLinks: {
      twitter?: string
      youtube?: string
      discord?: string
    }
  }
}

export function StreamInfo({ streamData }: StreamInfoProps) {
  const [isFollowing, setIsFollowing] = useState(false)
  const [showFullDescription, setShowFullDescription] = useState(false)

  const handleFollow = () => {
    setIsFollowing(!isFollowing)
    // API call would go here
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: streamData.title,
        text: `Check out ${streamData.streamer}'s stream!`,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      // Show toast notification
    }
  }

  return (
    <div className="space-y-6">
      {/* Stream Title and Actions */}
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-bold mb-2 line-clamp-2">{streamData.title}</h1>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <span className="flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span>{streamData.viewers.toLocaleString()} viewers</span>
            </span>
            <span className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>Started 2 hours ago</span>
            </span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 ml-4">
          <Button
            onClick={handleFollow}
            variant={isFollowing ? "outline" : "default"}
            className={`${!isFollowing ? 'bg-stream-purple hover:bg-stream-purple-dark text-white' : ''} follow-btn`}
          >
            <Heart className={`w-4 h-4 mr-2 ${isFollowing ? 'fill-current' : ''}`} />
            {isFollowing ? 'Following' : 'Follow'}
          </Button>
          <Button variant="outline" onClick={handleShare}>
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
        </div>
      </div>

      {/* Streamer Info */}
      <div className="flex items-center space-x-4 p-4 bg-muted/50 rounded-lg">
        <Avatar className="w-16 h-16">
          <AvatarImage src={streamData.avatar} />
          <AvatarFallback>{streamData.streamer[0]}</AvatarFallback>
        </Avatar>
        
        <div className="flex-1">
          <h3 className="text-lg font-semibold">{streamData.streamer}</h3>
          <p className="text-sm text-muted-foreground">
            {streamData.followers.toLocaleString()} followers
          </p>
          <div className="flex items-center space-x-2 mt-2">
            <Badge variant="secondary">{streamData.category}</Badge>
            {streamData.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="about" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
          <TabsTrigger value="social">Social</TabsTrigger>
        </TabsList>
        
        <TabsContent value="about" className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Stream Description</h4>
            <div className="text-sm text-muted-foreground">
              <p className={showFullDescription ? '' : 'line-clamp-3'}>
                {streamData.description}
              </p>
              <button
                onClick={() => setShowFullDescription(!showFullDescription)}
                className="text-stream-purple hover:underline mt-1"
              >
                {showFullDescription ? 'Show less' : 'Show more'}
              </button>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">Tags</h4>
            <div className="flex flex-wrap gap-2">
              {streamData.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="schedule" className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Streaming Schedule</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between p-2 bg-muted/50 rounded">
                <span>Monday - Friday</span>
                <span>6:00 PM - 11:00 PM EST</span>
              </div>
              <div className="flex justify-between p-2 bg-muted/50 rounded">
                <span>Saturday</span>
                <span>2:00 PM - 8:00 PM EST</span>
              </div>
              <div className="flex justify-between p-2 bg-muted/50 rounded">
                <span>Sunday</span>
                <span>Rest Day</span>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="social" className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Social Links</h4>
            <div className="space-y-2">
              {streamData.socialLinks.twitter && (
                <a
                  href={streamData.socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 p-2 bg-muted/50 rounded hover:bg-muted transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Twitter</span>
                </a>
              )}
              {streamData.socialLinks.youtube && (
                <a
                  href={streamData.socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 p-2 bg-muted/50 rounded hover:bg-muted transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>YouTube</span>
                </a>
              )}
              {streamData.socialLinks.discord && (
                <a
                  href={streamData.socialLinks.discord}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 p-2 bg-muted/50 rounded hover:bg-muted transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Discord</span>
                </a>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
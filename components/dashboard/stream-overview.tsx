'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Eye, Users, Clock, TrendingUp } from 'lucide-react'

export function StreamOverview() {
  const [streamData, setStreamData] = useState({
    isLive: false,
    viewers: 0,
    followers: 1234,
    streamTime: '00:00:00',
    totalViews: 45678
  })

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Stream Overview</CardTitle>
            <CardDescription>Your current streaming status</CardDescription>
          </div>
          <Badge variant={streamData.isLive ? "default" : "secondary"}>
            {streamData.isLive ? "LIVE" : "OFFLINE"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-lg mb-2">
              <Eye className="w-6 h-6 text-red-600" />
            </div>
            <p className="text-2xl font-bold">{streamData.viewers.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">Current Viewers</p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-2">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <p className="text-2xl font-bold">{streamData.followers.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">Followers</p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mb-2">
              <Clock className="w-6 h-6 text-green-600" />
            </div>
            <p className="text-2xl font-bold">{streamData.streamTime}</p>
            <p className="text-sm text-muted-foreground">Stream Time</p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mb-2">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <p className="text-2xl font-bold">{streamData.totalViews.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">Total Views</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
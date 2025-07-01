'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/lib/hooks/use-auth'
import { redirect } from 'next/navigation'
import { Header } from '@/components/layout/header'
import { Sidebar } from '@/components/layout/sidebar'
import { StreamCard } from '@/components/stream/stream-card'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function FollowingPage() {
  const { user, isLoading, isAuthenticated } = useAuth()
  const [liveStreams, setLiveStreams] = useState([])
  const [offlineChannels, setOfflineChannels] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isAuthenticated) {
      redirect('/auth/signin')
      return
    }

    const fetchFollowedContent = async () => {
      try {
        const response = await fetch('/api/users/following')
        const data = await response.json()
        
        setLiveStreams(data.liveStreams || [])
        setOfflineChannels(data.offlineChannels || [])
      } catch (error) {
        console.error('Error fetching followed content:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchFollowedContent()
  }, [isAuthenticated])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 ml-64">
          <div className="max-w-7xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold">Following</h1>

            {loading ? (
              <div className="flex justify-center py-12">
                <LoadingSpinner size="lg" />
              </div>
            ) : (
              <Tabs defaultValue="live" className="w-full">
                <TabsList>
                  <TabsTrigger value="live">
                    Live ({liveStreams.length})
                  </TabsTrigger>
                  <TabsTrigger value="offline">
                    Offline ({offlineChannels.length})
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="live" className="space-y-6">
                  {liveStreams.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {liveStreams.map((stream) => (
                        <StreamCard key={stream.id} stream={stream} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground">
                        None of the channels you follow are currently live
                      </p>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="offline" className="space-y-6">
                  {offlineChannels.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {offlineChannels.map((channel) => (
                        <UserCard key={channel.id} user={channel} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground">
                        You're not following any channels yet
                      </p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
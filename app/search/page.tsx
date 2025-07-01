'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Header } from '@/components/layout/header'
import { Sidebar } from '@/components/layout/sidebar'
import { StreamCard } from '@/components/stream/stream-card'
import { UserCard } from '@/components/user/user-card'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''
  const [streams, setStreams] = useState([])
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const searchContent = async () => {
      if (!query) {
        setLoading(false)
        return
      }

      try {
        const [streamsRes, usersRes] = await Promise.all([
          fetch(`/api/streams?search=${encodeURIComponent(query)}`),
          fetch(`/api/users?search=${encodeURIComponent(query)}`)
        ])

        const [streamsData, usersData] = await Promise.all([
          streamsRes.json(),
          usersRes.json()
        ])

        setStreams(streamsData)
        setUsers(usersData)
      } catch (error) {
        console.error('Search error:', error)
      } finally {
        setLoading(false)
      }
    }

    searchContent()
  }, [query])

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 ml-64">
          <div className="max-w-7xl mx-auto space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">Search Results</h1>
              {query && (
                <p className="text-muted-foreground">
                  Results for "{query}"
                </p>
              )}
            </div>

            {loading ? (
              <div className="flex justify-center py-12">
                <LoadingSpinner size="lg" />
              </div>
            ) : (
              <Tabs defaultValue="streams" className="w-full">
                <TabsList>
                  <TabsTrigger value="streams">
                    Streams ({streams.length})
                  </TabsTrigger>
                  <TabsTrigger value="channels">
                    Channels ({users.length})
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="streams" className="space-y-6">
                  {streams.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {streams.map((stream) => (
                        <StreamCard key={stream.id} stream={stream} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground">No streams found</p>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="channels" className="space-y-6">
                  {users.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {users.map((user) => (
                        <UserCard key={user.id} user={user} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground">No channels found</p>
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
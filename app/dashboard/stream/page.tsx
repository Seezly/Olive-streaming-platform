'use client'

import { useState } from 'react'
import { useAuth } from '@/lib/hooks/use-auth'
import { redirect } from 'next/navigation'
import { DashboardHeader } from '@/components/dashboard/dashboard-header'
import { DashboardSidebar } from '@/components/dashboard/dashboard-sidebar'
import { StreamSetup } from '@/components/dashboard/stream-setup'
import { StreamControls } from '@/components/dashboard/stream-controls'
import { StreamPreview } from '@/components/dashboard/stream-preview'
import { StreamChat } from '@/components/stream/stream-chat'

export default function StreamDashboardPage() {
  const { user, isLoading, isAuthenticated } = useAuth()
  const [isLive, setIsLive] = useState(false)
  const [streamData, setStreamData] = useState(null)

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!isAuthenticated) {
    redirect('/auth/signin')
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <div className="flex">
        <DashboardSidebar />
        <main className="flex-1 p-6 ml-64">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold">Stream Manager</h1>
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${isLive ? 'bg-red-500' : 'bg-gray-400'}`} />
                <span className="text-sm font-medium">
                  {isLive ? 'LIVE' : 'OFFLINE'}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                {!isLive ? (
                  <StreamSetup onStreamStart={(data) => {
                    setStreamData(data)
                    setIsLive(true)
                  }} />
                ) : (
                  <>
                    <StreamPreview streamData={streamData} />
                    <StreamControls 
                      streamData={streamData}
                      onStreamEnd={() => {
                        setIsLive(false)
                        setStreamData(null)
                      }}
                    />
                  </>
                )}
              </div>
              <div className="space-y-6">
                {isLive && streamData && (
                  <StreamChat streamData={streamData} />
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
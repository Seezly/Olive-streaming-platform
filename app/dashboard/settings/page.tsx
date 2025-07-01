'use client'

import { useAuth } from '@/lib/hooks/use-auth'
import { redirect } from 'next/navigation'
import { DashboardHeader } from '@/components/dashboard/dashboard-header'
import { DashboardSidebar } from '@/components/dashboard/dashboard-sidebar'
import { ProfileSettings } from '@/components/dashboard/profile-settings'
import { StreamSettings } from '@/components/dashboard/stream-settings'
import { NotificationSettings } from '@/components/dashboard/notification-settings'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function SettingsPage() {
  const { user, isLoading, isAuthenticated } = useAuth()

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
          <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold">Settings</h1>

            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="stream">Stream</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
              </TabsList>
              
              <TabsContent value="profile" className="space-y-6">
                <ProfileSettings />
              </TabsContent>
              
              <TabsContent value="stream" className="space-y-6">
                <StreamSettings />
              </TabsContent>
              
              <TabsContent value="notifications" className="space-y-6">
                <NotificationSettings />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}
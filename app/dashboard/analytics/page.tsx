'use client'

import { useAuth } from '@/lib/hooks/use-auth'
import { redirect } from 'next/navigation'
import { DashboardHeader } from '@/components/dashboard/dashboard-header'
import { DashboardSidebar } from '@/components/dashboard/dashboard-sidebar'
import { AnalyticsOverview } from '@/components/dashboard/analytics-overview'
import { ViewershipChart } from '@/components/dashboard/viewership-chart'
import { RevenueChart } from '@/components/dashboard/revenue-chart'
import { TopStreams } from '@/components/dashboard/top-streams'

export default function AnalyticsPage() {
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
          <div className="max-w-7xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold">Analytics</h1>

            <AnalyticsOverview />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ViewershipChart />
              <RevenueChart />
            </div>

            <TopStreams />
          </div>
        </main>
      </div>
    </div>
  )
}
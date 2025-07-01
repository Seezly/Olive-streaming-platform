'use client'

import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Video, Settings, BarChart3, Users } from 'lucide-react'

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Common tasks and shortcuts</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button asChild className="w-full justify-start bg-stream-purple hover:bg-stream-purple-dark">
          <Link href="/dashboard/stream">
            <Video className="mr-2 h-4 w-4" />
            Start Stream
          </Link>
        </Button>
        
        <Button asChild variant="outline" className="w-full justify-start">
          <Link href="/dashboard/analytics">
            <BarChart3 className="mr-2 h-4 w-4" />
            View Analytics
          </Link>
        </Button>
        
        <Button asChild variant="outline" className="w-full justify-start">
          <Link href="/dashboard/community">
            <Users className="mr-2 h-4 w-4" />
            Manage Community
          </Link>
        </Button>
        
        <Button asChild variant="outline" className="w-full justify-start">
          <Link href="/dashboard/settings">
            <Settings className="mr-2 h-4 w-4" />
            Stream Settings
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}
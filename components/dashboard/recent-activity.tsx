'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'

const recentActivity = [
  {
    id: 1,
    type: 'follow',
    user: 'NewViewer123',
    avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&dpr=1',
    timestamp: '2 minutes ago'
  },
  {
    id: 2,
    type: 'donation',
    user: 'GenerousUser',
    avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&dpr=1',
    amount: '$25.00',
    timestamp: '5 minutes ago'
  },
  {
    id: 3,
    type: 'subscription',
    user: 'LoyalFan',
    avatar: 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&dpr=1',
    tier: 'Tier 2',
    timestamp: '10 minutes ago'
  }
]

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest interactions from your community</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {recentActivity.map((activity) => (
          <div key={activity.id} className="flex items-center space-x-3">
            <Avatar className="w-8 h-8">
              <AvatarImage src={activity.avatar} />
              <AvatarFallback>{activity.user[0]}</AvatarFallback>
            </Avatar>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                <p className="text-sm font-medium truncate">{activity.user}</p>
                <Badge variant="outline" className="text-xs">
                  {activity.type === 'follow' && 'Followed'}
                  {activity.type === 'donation' && `Donated ${activity.amount}`}
                  {activity.type === 'subscription' && `Subscribed ${activity.tier}`}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
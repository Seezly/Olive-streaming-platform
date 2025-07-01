'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const data = [
  { name: 'Mon', viewers: 120 },
  { name: 'Tue', viewers: 190 },
  { name: 'Wed', viewers: 300 },
  { name: 'Thu', viewers: 250 },
  { name: 'Fri', viewers: 420 },
  { name: 'Sat', viewers: 380 },
  { name: 'Sun', viewers: 290 },
]

export function Analytics() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Viewer Analytics</CardTitle>
        <CardDescription>Your viewership over the past week</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line 
              type="monotone" 
              dataKey="viewers" 
              stroke="#9146FF" 
              strokeWidth={2}
              dot={{ fill: '#9146FF' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
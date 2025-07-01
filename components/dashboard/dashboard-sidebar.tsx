'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  Home, 
  Video, 
  BarChart3, 
  Settings,
  Users,
  DollarSign,
  MessageSquare,
  Calendar
} from 'lucide-react'
import { cn } from '@/lib/utils'

const sidebarItems = [
  { name: 'Overview', href: '/dashboard', icon: Home },
  { name: 'Stream Manager', href: '/dashboard/stream', icon: Video },
  { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
  { name: 'Community', href: '/dashboard/community', icon: Users },
  { name: 'Revenue', href: '/dashboard/revenue', icon: DollarSign },
  { name: 'Chat Moderation', href: '/dashboard/moderation', icon: MessageSquare },
  { name: 'Schedule', href: '/dashboard/schedule', icon: Calendar },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
]

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 border-r bg-background overflow-y-auto">
      <div className="p-4 space-y-2">
        <nav className="space-y-1">
          {sidebarItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                pathname === item.href
                  ? "bg-stream-purple text-white"
                  : "hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  )
}
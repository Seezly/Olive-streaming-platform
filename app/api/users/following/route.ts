import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get all users that the current user follows
    const follows = await prisma.follow.findMany({
      where: {
        followerId: session.user.id
      },
      include: {
        following: {
          select: {
            id: true,
            username: true,
            avatar: true,
            bio: true,
            followers: true,
            streams: {
              where: {
                isLive: true
              },
              select: {
                id: true,
                title: true,
                category: true,
                viewers: true,
                thumbnailUrl: true,
                tags: true,
                startedAt: true
              },
              take: 1
            }
          }
        }
      }
    })

    const liveStreams = []
    const offlineChannels = []

    follows.forEach(follow => {
      const user = follow.following
      const activeStream = user.streams[0]

      if (activeStream) {
        // User is currently streaming
        liveStreams.push({
          id: activeStream.id,
          title: activeStream.title,
          streamer: user.username,
          avatar: user.avatar,
          thumbnail: activeStream.thumbnailUrl || 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=400&h=225&dpr=1',
          viewers: activeStream.viewers.toLocaleString(),
          category: activeStream.category,
          isLive: true,
          tags: activeStream.tags,
          streamerId: user.id,
          startedAt: activeStream.startedAt
        })
      } else {
        // User is offline
        offlineChannels.push({
          id: user.id,
          username: user.username,
          avatar: user.avatar,
          bio: user.bio,
          followers: user.followers,
          isLive: false
        })
      }
    })

    // Sort live streams by viewer count (descending)
    liveStreams.sort((a, b) => {
      const aViewers = parseInt(a.viewers.replace(/,/g, ''))
      const bViewers = parseInt(b.viewers.replace(/,/g, ''))
      return bViewers - aViewers
    })

    // Sort offline channels alphabetically
    offlineChannels.sort((a, b) => a.username.localeCompare(b.username))

    return NextResponse.json({
      liveStreams,
      offlineChannels
    })
  } catch (error) {
    console.error('Error fetching followed content:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
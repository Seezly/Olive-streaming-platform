import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { createStreamSchema } from '@/lib/validations/stream'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')

    const where: any = {
      isLive: true
    }

    if (category) {
      where.category = category
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { streamer: { username: { contains: search, mode: 'insensitive' } } }
      ]
    }

    const streams = await prisma.stream.findMany({
      where,
      include: {
        streamer: {
          select: {
            id: true,
            username: true,
            avatar: true,
            followers: true
          }
        }
      },
      orderBy: {
        viewers: 'desc'
      },
      skip: (page - 1) * limit,
      take: limit
    })

    return NextResponse.json(streams)
  } catch (error) {
    console.error('Error fetching streams:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { title, description, category, tags, thumbnailUrl } = createStreamSchema.parse(body)

    // Generate unique stream key
    const streamKey = `sk_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    const stream = await prisma.stream.create({
      data: {
        title,
        description,
        category,
        tags,
        thumbnailUrl,
        streamKey,
        streamerId: session.user.id,
        rtmpUrl: `rtmp://localhost:1935/live/${streamKey}`,
        hlsUrl: `http://localhost:8080/hls/${streamKey}.m3u8`
      },
      include: {
        streamer: {
          select: {
            id: true,
            username: true,
            avatar: true
          }
        }
      }
    })

    return NextResponse.json(stream)
  } catch (error) {
    console.error('Error creating stream:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
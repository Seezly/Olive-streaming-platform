// Mock Prisma client for WebContainer environment
// This prevents the native addon loading error

interface User {
  id: string
  email: string
  username: string
  name?: string
  avatar?: string
  bio?: string
  isLive: boolean
  followers: number
  following: number
  createdAt: Date
  updatedAt: Date
}

interface Stream {
  id: string
  title: string
  description?: string
  category: string
  thumbnailUrl?: string
  streamKey: string
  isLive: boolean
  viewers: number
  userId: string
  user: User
  createdAt: Date
  updatedAt: Date
}

interface Follow {
  id: string
  followerId: string
  followingId: string
  follower: User
  following: User
  createdAt: Date
}

// Mock data store
const mockUsers: User[] = [
  {
    id: '1',
    email: 'demo@example.com',
    username: 'demo_streamer',
    name: 'Demo Streamer',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
    bio: 'Welcome to my stream!',
    isLive: true,
    followers: 1250,
    following: 89,
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

const mockStreams: Stream[] = [
  {
    id: '1',
    title: 'Live Gaming Session',
    description: 'Playing the latest games!',
    category: 'Gaming',
    thumbnailUrl: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=400',
    streamKey: 'demo-stream-key',
    isLive: true,
    viewers: 234,
    userId: '1',
    user: mockUsers[0],
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

const mockFollows: Follow[] = []

// Mock Prisma client
export const prisma = {
  user: {
    findUnique: async ({ where }: { where: { id?: string; email?: string; username?: string } }) => {
      return mockUsers.find(user => 
        user.id === where.id || 
        user.email === where.email || 
        user.username === where.username
      ) || null
    },
    findMany: async () => mockUsers,
    create: async ({ data }: { data: Partial<User> }) => {
      const newUser: User = {
        id: String(mockUsers.length + 1),
        email: data.email || '',
        username: data.username || '',
        name: data.name,
        avatar: data.avatar,
        bio: data.bio,
        isLive: false,
        followers: 0,
        following: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      mockUsers.push(newUser)
      return newUser
    },
    update: async ({ where, data }: { where: { id: string }, data: Partial<User> }) => {
      const userIndex = mockUsers.findIndex(user => user.id === where.id)
      if (userIndex !== -1) {
        mockUsers[userIndex] = { ...mockUsers[userIndex], ...data, updatedAt: new Date() }
        return mockUsers[userIndex]
      }
      throw new Error('User not found')
    }
  },
  stream: {
    findMany: async ({ where, include }: { where?: any, include?: any } = {}) => {
      let streams = [...mockStreams]
      if (where?.isLive !== undefined) {
        streams = streams.filter(stream => stream.isLive === where.isLive)
      }
      return streams
    },
    findUnique: async ({ where, include }: { where: { id: string }, include?: any }) => {
      return mockStreams.find(stream => stream.id === where.id) || null
    },
    create: async ({ data }: { data: Partial<Stream> }) => {
      const newStream: Stream = {
        id: String(mockStreams.length + 1),
        title: data.title || '',
        description: data.description,
        category: data.category || '',
        thumbnailUrl: data.thumbnailUrl,
        streamKey: data.streamKey || '',
        isLive: data.isLive || false,
        viewers: 0,
        userId: data.userId || '',
        user: mockUsers.find(u => u.id === data.userId) || mockUsers[0],
        createdAt: new Date(),
        updatedAt: new Date()
      }
      mockStreams.push(newStream)
      return newStream
    },
    update: async ({ where, data }: { where: { id: string }, data: Partial<Stream> }) => {
      const streamIndex = mockStreams.findIndex(stream => stream.id === where.id)
      if (streamIndex !== -1) {
        mockStreams[streamIndex] = { ...mockStreams[streamIndex], ...data, updatedAt: new Date() }
        return mockStreams[streamIndex]
      }
      throw new Error('Stream not found')
    }
  },
  follow: {
    findMany: async ({ where }: { where?: any } = {}) => {
      let follows = [...mockFollows]
      if (where?.followerId) {
        follows = follows.filter(follow => follow.followerId === where.followerId)
      }
      if (where?.followingId) {
        follows = follows.filter(follow => follow.followingId === where.followingId)
      }
      return follows
    },
    findUnique: async ({ where }: { where: { followerId_followingId: { followerId: string, followingId: string } } }) => {
      return mockFollows.find(follow => 
        follow.followerId === where.followerId_followingId.followerId && 
        follow.followingId === where.followerId_followingId.followingId
      ) || null
    },
    create: async ({ data }: { data: { followerId: string, followingId: string } }) => {
      const newFollow: Follow = {
        id: String(mockFollows.length + 1),
        followerId: data.followerId,
        followingId: data.followingId,
        follower: mockUsers.find(u => u.id === data.followerId) || mockUsers[0],
        following: mockUsers.find(u => u.id === data.followingId) || mockUsers[0],
        createdAt: new Date()
      }
      mockFollows.push(newFollow)
      return newFollow
    },
    delete: async ({ where }: { where: { followerId_followingId: { followerId: string, followingId: string } } }) => {
      const followIndex = mockFollows.findIndex(follow => 
        follow.followerId === where.followerId_followingId.followerId && 
        follow.followingId === where.followerId_followingId.followingId
      )
      if (followIndex !== -1) {
        const deletedFollow = mockFollows[followIndex]
        mockFollows.splice(followIndex, 1)
        return deletedFollow
      }
      throw new Error('Follow relationship not found')
    }
  }
}

export default prisma
import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      username: string
      email: string
      avatar?: string
      role: string
    }
  }

  interface User {
    id: string
    username: string
    email: string
    avatar?: string
    role: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    username: string
    role: string
  }
}
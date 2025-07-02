import NextAuth from 'next-auth'
import { authOptions } from '@/lib/auth'

async function handler(req: Request, context: { params: { nextauth: string[] } }) {
  return NextAuth(req, context, authOptions)
}

export { handler as GET, handler as POST }
import NextAuth from 'next-auth'
import { NextRequest } from 'next/server'
import { authOptions } from '@/lib/auth'

export async function GET(request: NextRequest) {
  return NextAuth(authOptions)(request)
}

export async function POST(request: NextRequest) {
  return NextAuth(authOptions)(request)
}
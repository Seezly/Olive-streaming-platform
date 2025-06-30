import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import next from 'next'

const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const handle = nextApp.getRequestHandler()
const port = process.env.PORT || 3001

nextApp.prepare().then(() => {
  const app = express()
  const server = createServer(app)
  const io = new Server(server, {
    cors: {
      origin: dev ? "http://localhost:3000" : false,
      methods: ["GET", "POST"]
    }
  })

  // Socket.IO connection handling
  io.on('connection', (socket) => {
    console.log('User connected:', socket.id)

    // Join a stream's chat room
    socket.on('join_stream', (streamId: string) => {
      socket.join(`stream_${streamId}`)
      console.log(`User ${socket.id} joined stream ${streamId}`)
    })

    // Handle chat messages
    socket.on('send_message', (data: { streamId: string; message: any }) => {
      // Broadcast message to all users in the stream's room
      socket.to(`stream_${data.streamId}`).emit('chat_message', data.message)
      console.log(`Message sent to stream ${data.streamId}:`, data.message)
    })

    // Handle stream events
    socket.on('stream_start', (streamId: string) => {
      socket.to(`stream_${streamId}`).emit('stream_started', { streamId })
    })

    socket.on('stream_end', (streamId: string) => {
      socket.to(`stream_${streamId}`).emit('stream_ended', { streamId })
    })

    // Handle viewer count updates
    socket.on('viewer_join', (streamId: string) => {
      socket.to(`stream_${streamId}`).emit('viewer_count_update', { 
        streamId, 
        action: 'join' 
      })
    })

    socket.on('viewer_leave', (streamId: string) => {
      socket.to(`stream_${streamId}`).emit('viewer_count_update', { 
        streamId, 
        action: 'leave' 
      })
    })

    // Handle donations/tips
    socket.on('donation', (data: { streamId: string; amount: number; message: string; username: string }) => {
      socket.to(`stream_${data.streamId}`).emit('donation_received', data)
    })

    // Handle follows
    socket.on('follow', (data: { streamId: string; username: string }) => {
      socket.to(`stream_${data.streamId}`).emit('new_follower', data)
    })

    // Handle subscriptions
    socket.on('subscribe', (data: { streamId: string; username: string; tier: number }) => {
      socket.to(`stream_${data.streamId}`).emit('new_subscriber', data)
    })

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id)
    })
  })

  // Handle all other routes with Next.js
  app.all('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, () => {
    console.log(`> Server ready on http://localhost:${port}`)
  })
})
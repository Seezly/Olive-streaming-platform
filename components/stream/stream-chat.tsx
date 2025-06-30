'use client'

import { useState, useEffect, useRef } from 'react'
import { Send, Smile, Gift, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { useSocket } from '@/app/providers'

interface ChatMessage {
  id: string
  username: string
  avatar: string
  message: string
  timestamp: Date
  badges: string[]
  color?: string
}

interface StreamChatProps {
  streamData: {
    id: string
    streamer: string
  }
}

// Mock chat messages
const mockMessages: ChatMessage[] = [
  {
    id: '1',
    username: 'ChatModerator',
    avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&dpr=1',
    message: 'Welcome to the stream everyone! 🎉',
    timestamp: new Date(),
    badges: ['moderator'],
    color: '#00adb5'
  },
  {
    id: '2',
    username: 'GamerFan123',
    avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&dpr=1',
    message: 'Nice play! That was insane!',
    timestamp: new Date(),
    badges: ['subscriber'],
    color: '#9146ff'
  },
  {
    id: '3',
    username: 'NewViewer',
    avatar: 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&dpr=1',
    message: 'First time watching, loving the content!',
    timestamp: new Date(),
    badges: []
  },
  {
    id: '4',
    username: 'VIPSupporter',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&dpr=1',
    message: 'Donated $50! Keep up the great work! 💰',
    timestamp: new Date(),
    badges: ['vip', 'subscriber'],
    color: '#ffd700'
  }
]

export function StreamChat({ streamData }: StreamChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(mockMessages)
  const [newMessage, setNewMessage] = useState('')
  const [isConnected, setIsConnected] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { socket } = useSocket()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (socket) {
      socket.on('connect', () => setIsConnected(true))
      socket.on('disconnect', () => setIsConnected(false))
      
      socket.on('chat_message', (message: ChatMessage) => {
        setMessages(prev => [...prev, message])
      })

      // Join the stream's chat room
      socket.emit('join_stream', streamData.id)

      return () => {
        socket.off('connect')
        socket.off('disconnect')
        socket.off('chat_message')
      }
    }
  }, [socket, streamData.id])

  const sendMessage = () => {
    if (newMessage.trim() && socket) {
      const message: ChatMessage = {
        id: Date.now().toString(),
        username: 'You', // This would come from user context
        avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&dpr=1',
        message: newMessage.trim(),
        timestamp: new Date(),
        badges: []
      }

      socket.emit('send_message', {
        streamId: streamData.id,
        message: message
      })

      setMessages(prev => [...prev, message])
      setNewMessage('')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessage()
    }
  }

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'moderator': return 'bg-green-600'
      case 'subscriber': return 'bg-stream-purple'
      case 'vip': return 'bg-yellow-600'
      default: return 'bg-gray-600'
    }
  }

  const getBadgeText = (badge: string) => {
    switch (badge) {
      case 'moderator': return 'MOD'
      case 'subscriber': return 'SUB'
      case 'vip': return 'VIP'
      default: return badge.toUpperCase()
    }
  }

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Chat Header */}
      <div className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <h3 className="font-semibold">Stream Chat</h3>
          <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
        </div>
        <Button size="icon" variant="ghost">
          <Settings className="w-4 h-4" />
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((message) => (
          <div key={message.id} className="chat-message">
            <div className="flex items-start space-x-2">
              <Avatar className="w-6 h-6 flex-shrink-0">
                <AvatarImage src={message.avatar} />
                <AvatarFallback className="text-xs">{message.username[0]}</AvatarFallback>
              </Avatar>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  {/* Badges */}
                  {message.badges.map((badge) => (
                    <Badge 
                      key={badge} 
                      className={`text-xs px-1 py-0 ${getBadgeColor(badge)} text-white`}
                    >
                      {getBadgeText(badge)}
                    </Badge>
                  ))}
                  
                  {/* Username */}
                  <span 
                    className="text-sm font-semibold"
                    style={{ color: message.color }}
                  >
                    {message.username}
                  </span>
                  
                  {/* Timestamp */}
                  <span className="text-xs text-muted-foreground">
                    {message.timestamp.toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </span>
                </div>
                
                {/* Message */}
                <p className="text-sm break-words">{message.message}</p>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input */}
      <div className="p-4 border-t">
        <div className="flex items-center space-x-2">
          <div className="flex-1 relative">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Send a message..."
              className="pr-20"
              maxLength={500}
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
              <Button size="icon" variant="ghost" className="h-6 w-6">
                <Smile className="w-4 h-4" />
              </Button>
              <Button size="icon" variant="ghost" className="h-6 w-6">
                <Gift className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <Button 
            onClick={sendMessage} 
            disabled={!newMessage.trim()}
            className="bg-stream-purple hover:bg-stream-purple-dark"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        
        {/* Chat Rules */}
        <p className="text-xs text-muted-foreground mt-2">
          Be respectful and follow community guidelines
        </p>
      </div>
    </div>
  )
}
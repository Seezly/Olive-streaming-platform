import { io, Socket } from 'socket.io-client'

class SocketManager {
  private socket: Socket | null = null
  private static instance: SocketManager

  static getInstance(): SocketManager {
    if (!SocketManager.instance) {
      SocketManager.instance = new SocketManager()
    }
    return SocketManager.instance
  }

  connect(): Socket {
    if (!this.socket) {
      // For now, we'll create a mock socket that doesn't actually connect
      // This prevents errors while maintaining the interface
      this.socket = {
        on: () => {},
        emit: () => {},
        off: () => {},
        disconnect: () => {},
        connected: false,
        id: 'mock-socket'
      } as any
    }
    return this.socket
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect()
      this.socket = null
    }
  }

  getSocket(): Socket | null {
    return this.socket
  }
}

export const socketManager = SocketManager.getInstance()
export const socket = socketManager.connect()
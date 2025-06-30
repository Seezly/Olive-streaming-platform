import { Suspense } from 'react'
import { Header } from '@/components/layout/header'
import { Sidebar } from '@/components/layout/sidebar'
import { StreamGrid } from '@/components/stream/stream-grid'
import { CategoryCarousel } from '@/components/categories/category-carousel'
import { FeaturedStreams } from '@/components/stream/featured-streams'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 ml-64">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Hero Section */}
            <section className="relative h-96 rounded-xl overflow-hidden bg-gradient-to-r from-stream-purple to-stream-purple-dark">
              <div className="absolute inset-0 bg-black/40" />
              <div className="relative z-10 h-full flex items-center justify-center text-center text-white">
                <div className="space-y-4">
                  <h1 className="text-5xl font-bold">Welcome to Olive</h1>
                  <p className="text-xl opacity-90">Discover amazing live streams and connect with creators</p>
                  <button className="bg-white text-stream-purple px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                    Start Watching
                  </button>
                </div>
              </div>
            </section>

            {/* Categories */}
            <section>
              <h2 className="text-2xl font-bold mb-6">Browse Categories</h2>
              <Suspense fallback={<LoadingSpinner />}>
                <CategoryCarousel />
              </Suspense>
            </section>

            {/* Featured Streams */}
            <section>
              <h2 className="text-2xl font-bold mb-6">Featured Live Streams</h2>
              <Suspense fallback={<LoadingSpinner />}>
                <FeaturedStreams />
              </Suspense>
            </section>

            {/* All Streams */}
            <section>
              <h2 className="text-2xl font-bold mb-6">Live Channels</h2>
              <Suspense fallback={<LoadingSpinner />}>
                <StreamGrid />
              </Suspense>
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}
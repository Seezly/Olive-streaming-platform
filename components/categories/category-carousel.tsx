'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Category {
  id: string
  name: string
  image: string
  viewers: string
  description: string
}

const categories: Category[] = [
  {
    id: '1',
    name: 'Just Chatting',
    image: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&dpr=1',
    viewers: '890K',
    description: 'Talk with streamers and community'
  },
  {
    id: '2',
    name: 'Valorant',
    image: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&dpr=1',
    viewers: '450K',
    description: 'Tactical FPS gameplay'
  },
  {
    id: '3',
    name: 'League of Legends',
    image: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&dpr=1',
    viewers: '320K',
    description: 'MOBA strategy gaming'
  },
  {
    id: '4',
    name: 'Music',
    image: 'https://images.pexels.com/photos/1751731/pexels-photo-1751731.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&dpr=1',
    viewers: '280K',
    description: 'Live music and performances'
  },
  {
    id: '5',
    name: 'Art',
    image: 'https://images.pexels.com/photos/1183992/pexels-photo-1183992.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&dpr=1',
    viewers: '150K',
    description: 'Creative art streams'
  },
  {
    id: '6',
    name: 'Minecraft',
    image: 'https://images.pexels.com/photos/1298601/pexels-photo-1298601.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&dpr=1',
    viewers: '200K',
    description: 'Building and survival'
  }
]

export function CategoryCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsPerView, setItemsPerView] = useState(4)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setItemsPerView(1)
      else if (window.innerWidth < 768) setItemsPerView(2)
      else if (window.innerWidth < 1024) setItemsPerView(3)
      else setItemsPerView(4)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const nextSlide = () => {
    setCurrentIndex((prev) => 
      prev + itemsPerView >= categories.length ? 0 : prev + 1
    )
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? Math.max(0, categories.length - itemsPerView) : prev - 1
    )
  }

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-4">
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={prevSlide}
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={nextSlide}
            disabled={currentIndex + itemsPerView >= categories.length}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="overflow-hidden">
        <div 
          className="flex transition-transform duration-300 ease-in-out"
          style={{ 
            transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
            width: `${(categories.length / itemsPerView) * 100}%`
          }}
        >
          {categories.map((category) => (
            <div 
              key={category.id} 
              className="flex-shrink-0 px-2"
              style={{ width: `${100 / categories.length}%` }}
            >
              <Link href={`/category/${category.name.toLowerCase().replace(' ', '-')}`}>
                <div className="category-card group relative aspect-[3/4] rounded-lg overflow-hidden bg-muted">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="font-bold text-lg mb-1">{category.name}</h3>
                    <p className="text-sm opacity-90 mb-2">{category.description}</p>
                    <div className="flex items-center space-x-1 text-sm">
                      <div className="w-2 h-2 bg-red-500 rounded-full" />
                      <span>{category.viewers} viewers</span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
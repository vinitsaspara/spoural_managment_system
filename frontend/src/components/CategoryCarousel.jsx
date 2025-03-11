import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'

const categories = [
  { name: 'Football', icon: '⚽' },
  { name: 'Basketball', icon: '🏀' },
  { name: 'Tennis', icon: '🎾' },
  { name: 'Swimming', icon: '🏊‍♂️' },
  { name: 'Athletics', icon: '🏃‍♂️' },
  { name: 'Volleyball', icon: '🏐' },
]

function CategoryCarousel() {
  return (
    <div className="bg-white py-16">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Sports Categories</h2>
        <Carousel className="w-full max-w-xs mx-auto">
          <CarouselContent>
            {categories.map((category, index) => (
              <CarouselItem key={index} className="basis-1/3">
                <div className="text-center">
                  <div className="text-4xl mb-2">{category.icon}</div>
                  <h3 className="font-semibold">{category.name}</h3>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  )
}

export default CategoryCarousel

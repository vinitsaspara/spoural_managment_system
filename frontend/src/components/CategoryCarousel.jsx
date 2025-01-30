import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import { Button } from './ui/button'

const category = [
    "Outdoor Sports",
    "Indoor Games",
    "E-Sports",
    "Fun & Casual Games"
]

function CategoryCarousel() {
  return (
    <div>
        <Carousel className="w-full max-w-md mx-auto">
        <CarouselContent>
          {category.map((cat, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
               <Button onClick={()=>searchJobHandler(cat)} className="bg-[#007BFF] hover:bg-[#003366]">{cat}</Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="bg-[#003366] text-white"/>
        <CarouselNext className="bg-[#003366] text-white" />
      </Carousel>
    </div>
  )
}

export default CategoryCarousel

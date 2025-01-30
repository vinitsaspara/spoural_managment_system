import React from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'

function HeroSection() {
  return (
    <div className='text-center'>
        <div className='flex flex-col gap-5 my-10'>
        <span className='mx-auto font-bold px-4 py-2 rounded-md bg-[#90aece] text-black'>Charusat Spoural Website</span>
        <h1 className='text-5xl font-bold'>Level Up! Find & <br /> Register for <span className='text-[#007BFF]'>Games!</span></h1>
        <p className='text-[#003366] font-bold'>Step into the game! Register now and be part of an exciting sports journey at CHARUSAT.</p>
        <div className="flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-md items-center gap-4 mx-auto">
          <input
            type="text"
            placeholder="Find your favorite games"
            className="outline-none border-none w-full"
          />
          <Button
            className="rounded-r-md rounded-l-none bg-[#003366] hover:bg-[#15487b]"
          >
            <Search className="h-5 w-5"></Search>
          </Button>
        </div>
        </div>
    </div>
  )
}

export default HeroSection
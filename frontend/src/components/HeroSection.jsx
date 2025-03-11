import React from 'react'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'

function HeroSection() {

  const navigate = useNavigate();

  return (
    <div className="relative bg-cover bg-center h-screen flex items-center" style={{backgroundImage: "url('https://www.shutterstock.com/image-vector/sports-set-athletes-various-disciplines-600nw-1349779070.jpg')"}}>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="container mx-auto text-center relative z-10">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">Spoural Games 2023</h1>
        <p className="text-xl md:text-2xl text-white mb-8">Experience the thrill of competition and sportsmanship</p>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white text-lg py-3 px-8"
          onClick={()=>navigate('/games')}
        >
          Register Now
        </Button>
      </div>
    </div>
  )
}

export default HeroSection

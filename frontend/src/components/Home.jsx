import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import CategoryCarousel from './CategoryCarousel'
import NewGames from './NewGames'
import Footer from './Footer'
import FeaturedEvents from './FeaturedEvents'
import Countdown from './Countdown'
import useGetAllGame from '@/hooks/useGetAllGame'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Home() {
  

  return (
    <div className="bg-gray-100">
      <Navbar />
      <HeroSection />
      <CategoryCarousel />
      <FeaturedEvents />
      <Countdown />
      <NewGames />
      <Footer />
    </div>
  )
}

export default Home

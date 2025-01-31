import React from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import CategoryCarousel from './CategoryCarousel'
import NewGames from './NewGames'
import Footer from './Footer'
import useGetAllGame from '@/hooks/useGetAllGame'

function Home() {
  useGetAllGame();
  return (
    <div>
        <Navbar/>
        <HeroSection/>
        <CategoryCarousel/>
        <NewGames/>
        <Footer/>
    </div>
  )
}

export default Home
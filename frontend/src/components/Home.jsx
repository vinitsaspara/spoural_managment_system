import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import CategoryCarousel from './CategoryCarousel'
import NewGames from './NewGames'
import Footer from './Footer'
import useGetAllGame from '@/hooks/useGetAllGame'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Home() {

  useGetAllGame();
  const {user} = useSelector(store=>store.auth);
  const navigate = useNavigate();

  useEffect(()=>{
    if(user?.role === 'Admin'){
      navigate('/admin/members');
    }else if(user?.role === 'Faculty'){
      navigate('/faculty');
    }else if(user?.role === 'StudentCoordinator'){
      navigate('/studentCoordinator')
    }

  },[])

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
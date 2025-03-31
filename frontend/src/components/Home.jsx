import React from 'react';
import Navbar from './shared/Navbar';
import HeroSection from './HeroSection';
import CategoryCarousel from './CategoryCarousel';
import NewGames from './NewGames';
import Footer from './Footer';
import FeaturedEvents from './FeaturedEvents';
import Countdown from './Countdown';
import { useSelector } from 'react-redux';

function Home() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="bg-gray-100">
      <Navbar />
      <HeroSection />
      <CategoryCarousel />
      
      {/* Show these components only if the user exists */}
      {user && (
        <>
          <FeaturedEvents />
          <Countdown />
          <NewGames />
        </>
      )}

      <Footer />
    </div>
  );
}

export default Home;

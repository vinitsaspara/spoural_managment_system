import React from 'react'
import { Button } from './ui/button'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'
import { CalendarIcon, InfoIcon } from 'lucide-react'

function GameCards({ game }) {
  const navigate = useNavigate();

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDiff = currentTime - createdAt;
    return Math.floor(timeDiff / (1000 * 24 * 60 * 60));
  }

  const getShortDescription = (desc) => {
    const words = desc.split(' ');
    if (words.length > 15) {
      return words.slice(0, 15).join(' ') + '...';
    }
    return desc;
  };

  return (
    <div className="group relative flex flex-col h-[400px] bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden">
      {/* Image Section with enhanced hover effect */}
      <div className="relative h-48 w-full overflow-hidden">
        <img 
          src={game?.logo} 
          alt={game?.gameName}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>

      {/* Content Section with improved hover effects */}
      <div className="flex flex-col flex-grow p-6 relative">
        {/* Header with enhanced hover effects */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800 group-hover:text-blue-600 transition-all duration-300 transform group-hover:-translate-y-1">
            {game?.gameName}
          </h2>
          <Badge className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full group-hover:bg-blue-50 group-hover:text-blue-600 transition-all duration-300 transform group-hover:scale-105">
            <CalendarIcon className="w-4 h-4 mr-1 inline" />
            {daysAgoFunction(game?.createdAt) === 0 ? "Today" : `${daysAgoFunction(game?.createdAt)}d ago`}
          </Badge>
        </div>

        {/* Category with hover effect */}
        <p className="text-gray-600 mb-4 group-hover:text-gray-800 transition-all duration-300 transform group-hover:translate-x-1">
          {game?.gameCatagory} Charusat
        </p>

        {/* Description with enhanced hover effect */}
        <p className="text-gray-500 mb-6 group-hover:text-gray-700 transition-all duration-300 transform group-hover:translate-x-1">
          {getShortDescription(game?.description)}
        </p>

        {/* Skills with improved hover effects */}
        <div className="flex flex-wrap gap-2 mb-6">
          {game?.skills.slice(0, 3).map((skill, index) => (
            <Badge 
              key={index} 
              className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm group-hover:bg-blue-50 group-hover:text-blue-600 transition-all duration-300 transform group-hover:scale-105 group-hover:-translate-y-0.5"
            >
              {skill}
            </Badge>
          ))}
        </div>

        {/* Button with enhanced hover effects */}
        <Button
          className="mt-auto w-full bg-gray-100 text-gray-700 hover:bg-blue-600 hover:text-white transition-all duration-300 flex items-center justify-center space-x-2 group-hover:shadow-lg group-hover:shadow-blue-500/20 transform group-hover:-translate-y-1"
          onClick={() => navigate(`/details/${game?._id}`)}
        >
          <InfoIcon className="w-4 h-4 transform group-hover:scale-110 transition-transform duration-300" />
          <span className="transform group-hover:translate-x-1 transition-transform duration-300">
            Details & Register
          </span>
        </Button>
      </div>

      {/* Enhanced hover effect indicators */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
      <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-blue-600 to-blue-400 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top"></div>
    </div>
  )
}

export default GameCards

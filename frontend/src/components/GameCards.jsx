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
    if (!desc) return '';
    const words = desc.split(' ');
    if (words.length > 15) {
      return words.slice(0, 15).join(' ') + '...';
    }
    return desc;
  };

  return (
    <div className="group relative flex flex-col w-full min-h-[500px] bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden">
      {/* Image Section */}
      <div className="relative w-full h-48 overflow-hidden">
        <img 
          src={game?.logo || '/default-game-image.jpg'} 
          alt={game?.gameName}
          className="w-full h-full object-cover object-center transform group-hover:scale-110 transition-transform duration-700"
          onError={(e) => {
            e.target.src = '/default-game-image.jpg';
            e.target.onerror = null;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>

      {/* Content Section */}
      <div className="flex flex-col flex-grow p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-all duration-300">
            {game?.gameName}
          </h2>
          <Badge className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full group-hover:bg-blue-50 group-hover:text-blue-600 transition-all duration-300 whitespace-nowrap">
            <CalendarIcon className="w-4 h-4 mr-1 inline" />
            {daysAgoFunction(game?.createdAt) === 0 ? "Today" : `${daysAgoFunction(game?.createdAt)}d ago`}
          </Badge>
        </div>

        {/* Category */}
        <p className="text-gray-600 mb-4 group-hover:text-gray-800 transition-all duration-300">
          {game?.gameCatagory} Charusat
        </p>

        {/* Description */}
        <p className="text-gray-500 mb-4 group-hover:text-gray-700 transition-all duration-300 line-clamp-3">
          {getShortDescription(game?.description)}
        </p>

        {/* Skills */}
        <div className="flex flex-wrap gap-2 mb-6">
          {game?.skills?.slice(0, 3).map((skill, index) => (
            <Badge 
              key={index} 
              className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm group-hover:bg-blue-50 group-hover:text-blue-600 transition-all duration-300"
            >
              {skill}
            </Badge>
          ))}
          {game?.skills?.length > 3 && (
            <Badge className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
              +{game.skills.length - 3} more
            </Badge>
          )}
        </div>

        {/* Button */}
        <div className="mt-auto">
          <Button
            className="w-full bg-gray-100 text-gray-700 hover:bg-blue-600 hover:text-white transition-all duration-300 flex items-center justify-center space-x-2 group-hover:shadow-lg group-hover:shadow-blue-500/20"
            onClick={() => navigate(`/details/${game?._id}`)}
          >
            <InfoIcon className="w-4 h-4 mr-2" />
            <span>Details & Register</span>
          </Button>
        </div>
      </div>

      {/* Hover effect indicators */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
      <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-blue-600 to-blue-400 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top"></div>
    </div>
  )
}

export default GameCards

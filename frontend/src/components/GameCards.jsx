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
    <div className="group relative flex flex-col h-full p-6 rounded-2xl bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white border border-blue-400/20 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 ease-in-out hover:-translate-y-1 overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Header Section with enhanced styling */}
      <div className="relative flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Avatar className="h-14 w-14 ring-2 ring-blue-300/50 group-hover:ring-blue-200 transition-all duration-300">
              <AvatarImage src={game?.logo} alt={game?.gameName} className="object-cover" />
            </Avatar>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-blue-900"></div>
          </div>
          <div>
            <h2 className="text-xl font-bold group-hover:text-blue-100 transition-colors duration-300">
              {game?.gameName}
            </h2>
            <p className="text-sm text-blue-200/80 group-hover:text-blue-100 transition-colors duration-300">
              {game?.gameCatagory} Charusat
            </p>
          </div>
        </div>
        <Badge className="bg-blue-500/80 backdrop-blur-sm text-white px-3 py-1 rounded-full group-hover:bg-blue-400 transition-colors duration-300">
          <CalendarIcon className="w-4 h-4 mr-1 inline" />
          {daysAgoFunction(game?.createdAt) === 0 ? "Today" : `${daysAgoFunction(game?.createdAt)}d ago`}
        </Badge>
      </div>

      {/* Content Section with improved styling */}
      <div className="relative flex-grow">
        <p className="text-sm text-blue-100/90 mb-6 group-hover:text-white transition-colors duration-300">
          {getShortDescription(game?.description)}
        </p>

        {/* Skills Section with enhanced badges */}
        <div className="min-h-[40px] mb-6">
          <div className="flex flex-wrap gap-2">
            {game?.skills.slice(0, 3).map((skill, index) => (
              <Badge 
                key={index} 
                className="bg-blue-600/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs group-hover:bg-blue-500 transition-all duration-300"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Button Section with enhanced hover effects */}
      <Button
        className="relative w-full bg-white/90 text-blue-900 hover:bg-white transition-all duration-300 flex items-center justify-center space-x-2 group-hover:shadow-lg group-hover:shadow-blue-500/20"
        onClick={() => navigate(`/details/${game?._id}`)}
      >
        <InfoIcon className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
        <span className="group-hover:translate-x-1 transition-transform duration-300">
          Details & Register
        </span>
      </Button>

      {/* Hover effect indicators */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-blue-200 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
      <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-blue-400 to-blue-200 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top"></div>
    </div>
  )
}

export default GameCards

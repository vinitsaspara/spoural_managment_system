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
    const words = desc?.split(' ');
    if (words?.length > 15) {
      return words.slice(0, 15).join(' ') + '...';
    }
    return desc;
  };

  return (
    <div className="group relative flex flex-col h-[460px] bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border">
      
      {/* Full image header */}
      <div className="relative h-56 w-full overflow-hidden">
        <img 
          src={game?.logo} 
          alt={game?.gameName}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>

      {/* Body content */}
      <div className="flex flex-col flex-grow px-6 pt-4 pb-6 relative">
        
        {/* Title and date */}
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-all duration-300">
            {game?.gameName}
          </h2>
          <Badge className="flex items-center gap-1 bg-gray-100 text-gray-600 group-hover:bg-blue-100 group-hover:text-blue-600 transition">
            <CalendarIcon className="w-4 h-4" />
            {daysAgoFunction(game?.createdAt) === 0 ? "Today" : `${daysAgoFunction(game?.createdAt)}d ago`}
          </Badge>
        </div>

        <p className="text-sm text-gray-500 mb-1">{game?.gameCatagory} Charusat</p>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-4">
          {getShortDescription(game?.description)}
        </p>

        {/* Skills */}
        <div className="flex flex-wrap gap-2 mb-5">
          {game?.skills.slice(0, 3).map((skill, index) => (
            <Badge
              key={index}
              className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full"
            >
              {skill}
            </Badge>
          ))}
        </div>

        {/* Button */}
        <Button
          className="w-full mt-auto bg-gray-100 text-gray-700 hover:bg-blue-600 hover:text-white transition flex items-center justify-center gap-2"
          onClick={() => navigate(`/details/${game?._id}`)}
        >
          <InfoIcon className="w-4 h-4" />
          Details & Register
        </Button>
      </div>
    </div>
  );
}

export default GameCards;

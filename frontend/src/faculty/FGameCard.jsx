import React from 'react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { useNavigate } from 'react-router-dom'
import { CalendarIcon, InfoIcon, Users, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

function FGameCards({ game }) {
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
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="flex flex-col h-full bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out group overflow-hidden"
    >
      {/* Image Section */}
      <div className="relative h-48 w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/20 to-blue-500/60 z-10 group-hover:from-blue-500/30 group-hover:to-blue-500/70 transition-all duration-300" />
        <img 
          src={game?.logo} 
          alt={game?.gameName}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 z-20">
          <Badge className="bg-white/90 text-blue-600 px-4 py-1.5 rounded-full text-sm font-medium backdrop-blur-sm group-hover:bg-white transition-all duration-300 flex items-center gap-1">
            <CalendarIcon className="w-3.5 h-3.5" />
            {daysAgoFunction(game?.createdAt) === 0 ? "Today" : `${daysAgoFunction(game?.createdAt)}d ago`}
          </Badge>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center space-x-4 mb-4">
          <div className="relative">
            <Avatar className="h-12 w-12 ring-2 ring-blue-200">
              <AvatarImage 
                src={game?.logo} 
                alt={game?.gameName}
                className="object-cover"
              />
            </Avatar>
            <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1">
              <Users className="h-2.5 w-2.5 text-white" />
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
              {game?.gameName}
            </h2>
            <p className="text-sm text-gray-500 flex items-center gap-1">
              {game?.gameCatagory} • Charusat
            </p>
          </div>
        </div>
        
        <div className="flex-grow">
          <p className="text-sm text-gray-600 mb-4 leading-relaxed">
            {getShortDescription(game?.description)}
          </p>
          <div className="min-h-[40px] mb-6">
            <div className="flex flex-wrap gap-2">
              {game?.skills.slice(0, 3).map((skill, index) => (
                <Badge 
                  key={index} 
                  className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-medium group-hover:bg-blue-100 transition-all duration-300"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="relative"
        >
          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-200 group-hover:bg-blue-500 transition-all duration-300" />
          <Button 
            className="w-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-all duration-300 flex items-center justify-center space-x-2 py-6 rounded-xl font-medium group-hover:shadow-md" 
            onClick={() => navigate(`viewselectedStudent/${game?._id}`)}
          >
            <InfoIcon className="w-4 h-4" />
            <span>View Selected Student</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default FGameCards

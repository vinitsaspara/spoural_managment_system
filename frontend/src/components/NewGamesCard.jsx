import React from 'react'
import { Button } from './ui/button'
import { ArrowRight } from 'lucide-react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

function NewGamesCard({game}) {
  const navigate = useNavigate();

  const getShortDescription = (desc) => {
    const words = desc.split(' ');
    if (words.length > 15) {
      return words.slice(0, 15).join(' ') + '...';
    }
    return desc;
  };

  return (
    <div className='group relative flex flex-col h-[280px] bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden'>
      {/* Background gradient effect */}
      <div className='absolute inset-0 bg-gradient-to-br from-blue-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
      
      {/* Card Header with enhanced styling */}
      <div className='relative p-4 border-b border-gray-100'>
        <h3 className='text-lg font-semibold text-blue-900 group-hover:text-blue-700 transition-colors duration-300'>
          {game?.gameName}
        </h3>
        <p className='text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300'>
          {game?.gameCatagory} - Charusat
        </p>
      </div>

      {/* Card Content with improved spacing */}
      <div className='relative flex-1 p-4'>
        {/* Description with enhanced styling */}
        <div className='h-[60px]'>
          <p className='text-sm text-gray-700 line-clamp-3 group-hover:text-gray-800 transition-colors duration-300'>
            {getShortDescription(game?.description)}
          </p>
        </div>

        {/* Skills with improved badge styling */}
        <div className='mt-3 h-[40px]'>
          <div className='flex flex-wrap gap-2'>
            {game?.skills.slice(0, 3).map((skill, index) => (
              <Badge
                key={index}
                variant="secondary"
                className='bg-blue-50 text-blue-700 text-xs group-hover:bg-blue-100 group-hover:text-blue-800 transition-colors duration-300'
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Card Footer with enhanced button styling */}
      <div className='relative p-4 mt-auto border-t border-gray-100'>
        <Button
          variant="ghost"
          className='w-full text-blue-600 hover:bg-blue-50 flex items-center justify-center group-hover:bg-blue-50 transition-all duration-300'
          onClick={() => navigate(`/details/${game?._id}`)}
        >
          <span className='group-hover:translate-x-1 transition-transform duration-300'>
            View Details
          </span>
          <ArrowRight className='ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300' />
        </Button>
      </div>

      {/* Hover effect indicator */}
      <div className='absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left'></div>
    </div>
  )
}

export default NewGamesCard

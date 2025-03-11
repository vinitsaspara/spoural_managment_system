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
    <div className='flex flex-col h-[280px] bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300'>
      {/* Card Header */}
      <div className='p-4 border-b'>
        <h3 className='text-lg font-semibold text-blue-900'>{game?.gameName}</h3>
        <p className='text-sm text-gray-600'>{game?.gameCatagory} - Charusat</p>
      </div>

      {/* Card Content */}
      <div className='flex-1 p-4'>
        {/* Description with fixed height */}
        <div className='h-[60px]'>
          <p className='text-sm text-gray-700 line-clamp-3'>
            {getShortDescription(game?.description)}
          </p>
        </div>

        {/* Skills with fixed height */}
        <div className='mt-3 h-[40px]'>
          <div className='flex flex-wrap gap-2'>
            {game?.skills.slice(0, 3).map((skill, index) => (
              <Badge
                key={index}
                variant="secondary"
                className='bg-blue-50 text-blue-700 text-xs'
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Card Footer - Always at bottom */}
      <div className='p-4 mt-auto border-t'>
        <Button
          variant="ghost"
          className='w-full text-blue-600 hover:bg-blue-50 flex items-center justify-center'
          onClick={() => navigate(`/details/${game?._id}`)}
        >
          View Details
          <ArrowRight className='ml-2 h-4 w-4' />
        </Button>
      </div>
    </div>
  )
}

export default NewGamesCard

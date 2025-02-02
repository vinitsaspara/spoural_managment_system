
import React from 'react'
import { Badge } from './ui/badge'



function NewGamesCard({game}) {


  const getShortDescription = (desc) => {
    const words = desc.split(' ');  // Split the string into words
    if (words.length > 10) {
      return words.slice(0, 10).join(' ') + '...'; // Take first 4 words and add "..."
    }
    return desc;  // Return the description as is if it's 4 words or less
  };

  return (
    <div className='p-5 cursor-pointer rounded-md shadow-lg bg-white border border-gray-100'>

        <div>
        <h1 className='font-medium text-lg'>{game?.gameCatagory}</h1>
        <p className='text-sm text-gray-500'>Charusat</p>
        </div>
        <div>
          <h1 className='font-bold text-lg my-2'>{game?.gameName}</h1>
          <p className='text-sm text-gray-600'>{getShortDescription
          (game?.description)}</p>
        </div>
          <div className='flex items-center gap-2 mt-4'>
                <Badge className='text-blue-800 font-bold' variant="ghost">{game?.skills[0]}</Badge>
                <Badge className='text-blue-800 font-bold' variant="ghost">{game?.skills[1]}</Badge>
                <Badge className='text-blue-800 font-bold' variant="ghost">{game?.skills[2]}</Badge>

            
        </div>
    </div>
  )
}

export default NewGamesCard

import React from 'react'
import { Badge } from './ui/badge'

const skills = [
  "Speed",
  "Strength",
  "Flexibility"
]

function NewGamesCard() {
  return (
    <div className='p-5 cursor-pointer rounded-md shadow-lg bg-white border border-gray-100'>

        <div>
        <h1 className='font-medium text-lg'>Game category</h1>
        <p className='text-sm text-gray-500'>Charusat</p>
        </div>
        <div>
          <h1 className='font-bold text-lg my-2'>Game Name</h1>
          <p className='text-sm text-gray-600'>Game Description - Lorem ipsum dolor sit amet.</p>
        </div>
          <div className='flex items-center gap-2 mt-4'>
            {/* {
              skill.map((sk,index)=>(
                <Badge className='text-blue-800 font-bold' variant="ghost">{sk}</Badge>
              ))
            } */}
                <Badge className='text-blue-800 font-bold' variant="ghost">{skills[0]}</Badge>
                <Badge className='text-blue-800 font-bold' variant="ghost">{skills[1]}</Badge>
                <Badge className='text-blue-800 font-bold' variant="ghost">{skills[2]}</Badge>

            
        </div>
    </div>
  )
}

export default NewGamesCard
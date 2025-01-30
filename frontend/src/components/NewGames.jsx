import React from 'react'
import NewGamesCard from './NewGamesCard';

const allGame = [1,2,3,4,5,6,7,8];

function NewGames() {
  return (
    <div className='max-w-5xl mx-auto my-20'>
        <h2 className='text-4xl font-bold'><span className='text-[#003366]'>Discover New </span> Games!</h2>
        <div className='grid grid-cols-3 gap-4 my-5'>
        {
            allGame.length <= 0 ? <span>No Game Available</span> : allGame?.slice(0,6).map((game,index)=><NewGamesCard/>)
        }
        </div>
    </div>
  )
}

export default NewGames
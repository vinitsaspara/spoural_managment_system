import React from 'react'
import NewGamesCard from './NewGamesCard';
import { useSelector } from 'react-redux';


function NewGames() {

  const {allGames} = useSelector((store) => store.game);

  return (
    <div className='max-w-5xl mx-auto my-20'>
        <h2 className='text-4xl font-bold'><span className='text-[#003366]'>Discover New </span> Games!</h2>
        <div className='grid grid-cols-3 gap-4 my-5'>
        {
            allGames.length <= 0 ? <span>No Game Available</span> : allGames?.slice(0,6).map((game,index)=><NewGamesCard key={game._id} game={game}/>)
        }
        </div>
    </div>
  )
}

export default NewGames
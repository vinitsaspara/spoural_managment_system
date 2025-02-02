import React from 'react'
import Navbar from './shared/Navbar'
import GameCards from './GameCards';
import { useSelector } from 'react-redux';

// const randomGames = [1,2,3];

function Browse() {

  const {allGames} = useSelector(state=>state.game);

  return (
    <div>
        <Navbar/>
        <div  className="max-w-5xl mx-auto my-10">
        <h1 className="font-bold text-lg my-10">Search Result ({allGames.length})</h1>
        <div className="grid grid-cols-3 gap-4 mt-5">
          {allGames.map((game,index) => {
            return <GameCards key={game?._id} game={game}/>;
          })}
        </div>
      </div>
    </div>
  )
}

export default Browse
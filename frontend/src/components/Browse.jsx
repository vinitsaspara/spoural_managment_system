import React from 'react'
import Navbar from './shared/Navbar'
import GameCards from './GameCards';

const randomGames = [1,2,3];

function Browse() {
  return (
    <div>
        <Navbar/>
        <div  className="max-w-5xl mx-auto my-10">
        <h1 className="font-bold text-lg my-10">Search Result ({randomGames.length})</h1>
        <div className="grid grid-cols-3 gap-4 mt-5">
          {randomGames.map((game,index) => {
            return <GameCards/>;
          })}
        </div>
      </div>
    </div>
  )
}

export default Browse
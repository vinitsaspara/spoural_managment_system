import React from 'react'
import { Button } from './ui/button'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

// const skills = [
//     "Speed",
//     "Strength",
//     "Flexibility"
//   ]

// const gameId = "nkdlsflisdjfiosadjf";

function GameCards({game}) {

  const navigate = useNavigate();
  const daysAgoFunction = (mongodbTime)=>{
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDiff = currentTime - createdAt;

    return Math.floor(timeDiff/(1000*24*60*60));
}

  return (
    <div className="p-5 rounded-md shadow-lg bg-[#003366] text-white border border-gray-100">
      <div className="flex items-center justify-between">
        <p className="text-sm text-white">{daysAgoFunction(game?.createdAt) === 0 ? "Today" : `${daysAgoFunction(game?.createdAt)} days ago`} </p>
       
      </div>
      <div className="flex items-center gap-2 my-2">
        <Button className="p-6 w-6" variant="outline" size-icon>
          <Avatar>
            <AvatarImage src='https://marketplace.canva.com/EAF1Ah5STk8/1/0/1600w/canva-dark-abstract-black-panther-gaming-logo-JqcoEpC3-BI.jpg' />
          </Avatar>
        </Button>
        <div>
          <h1 className="text-lg font-medium ">{game?.gameCatagory}</h1>
          <p className="text-sm text-white">Charusat</p>
        </div>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2">{game?.gameName}</h1>
        <p className="text-sm text-white">
        {game?.description}
        </p>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Badge className="text-white font-bold" variant="ghost">
        {game?.skills[0]}
        </Badge>
        <Badge className="text-white font-bold" variant="ghost">
        {game?.skills[1]}
        </Badge>
        <Badge className="text-white font-bold" variant="ghost">
        {game?.skills[2]}
        </Badge>
      </div>
      <div className="flex items-center gap-4 mt-4">
        <Button className="w-full bg-white text-black hover:bg-[#04A1DB]" onClick={()=>navigate(`/details/${game?._id}`)}>Details & Register</Button>

      </div>
    </div>
  )
}

export default GameCards
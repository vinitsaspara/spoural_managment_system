import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import React from 'react'
import { useNavigate } from 'react-router-dom'


function FGameCards({game}) {
  
  const navigate = useNavigate();
  const daysAgoFunction = (mongodbTime)=>{
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDiff = currentTime - createdAt;

    return Math.floor(timeDiff/(1000*24*60*60));
}

const getShortDescription = (desc) => {
  const words = desc.split(' ');  // Split the string into words
  if (words.length > 10) {
    return words.slice(0, 10).join(' ') + '...'; // Take first 4 words and add "..."
  }
  return desc;  // Return the description as is if it's 4 words or less
};

  return (
    <div className="p-5 rounded-md shadow-lg bg-[#003366] text-white border border-gray-100">
      <div className="flex items-center justify-between">
        <p className="text-sm text-white">{daysAgoFunction(game?.createdAt) === 0 ? "Today" : `${daysAgoFunction(game?.createdAt)} days ago`} </p>
       
      </div>
      <div className="flex items-center gap-2 my-2">
        <Button className="p-6 w-6" variant="outline" size-icon>
          <Avatar>
            <AvatarImage src={game?.logo} />
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
        {getShortDescription(game?.description)}
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
      <div className="flex items-center gap-4 mt-4 ">
        <Button className="w-full bg-white text-black  hover:bg-[#04A1DB]" 
        onClick={()=>navigate(`viewselectedStudent/${game?._id}`)}
        >Viwe Selected Student</Button>
      </div>
    </div>
  )
}


export default FGameCards 
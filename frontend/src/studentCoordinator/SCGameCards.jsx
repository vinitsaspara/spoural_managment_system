import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function SCGameCards({game}) {
  const navigate = useNavigate();

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDiff = currentTime - createdAt;

    return Math.floor(timeDiff / (1000 * 24 * 60 * 60));
  };

  const getShortDescription = (desc) => {
    const words = desc.split(' ');
    if (words.length > 10) {
      return words.slice(0, 10).join(' ') + '...';
    }
    return desc;
  };

  return (
    <div className="flex flex-col h-full p-6 rounded-lg shadow-xl bg-gradient-to-br from-blue-900 to-blue-700 text-white border border-blue-400 hover:shadow-2xl transition-all duration-300 ease-in-out">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Avatar className="h-12 w-12 ring-2 ring-blue-300">
            <AvatarImage src={game?.logo} />
          </Avatar>
          <div>
            <h2 className="text-xl font-bold">{game?.gameCatagory}</h2>
            <p className="text-sm text-blue-200">Charusat</p>
          </div>
        </div>
        <Badge className="bg-blue-500 text-white px-3 py-1 rounded-full">
          {daysAgoFunction(game?.createdAt) === 0 ? "Today" : `${daysAgoFunction(game?.createdAt)}d ago`}
        </Badge>
      </div>
      
      <div className="flex-grow">
        <h1 className="font-bold text-lg my-2">{game?.gameName}</h1>
        <p className="text-sm text-blue-100 mb-4">
        {getShortDescription(game?.description)}
        </p>
        <div className="min-h-[40px] mb-4">
          <div className="flex flex-wrap gap-2">
            {game?.skills.slice(0, 3).map((skill, index) => (
              <Badge 
                key={index} 
                className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </div>
      
      <Button 
        className="w-full bg-white text-blue-900 hover:bg-blue-100 transition-colors duration-200 flex items-center justify-center space-x-2" 
        onClick={() => navigate(`/viweAppliedStudent/${game?._id}`)}
      >
        <span>View Applied Student</span>
      </Button>
    </div>
  );
}

export default SCGameCards;

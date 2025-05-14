import React from "react";
import NewGamesCard from "./NewGamesCard";
import { useSelector } from "react-redux";
import useGetAllGame from "@/hooks/useGetAllGame";

function NewGames() {
  useGetAllGame();
  const { allGames } = useSelector((store) => store.game);
  
  return (
    <div className="max-w-5xl mx-auto my-20">
      <h2 className="text-4xl font-bold">
        <span className="text-[#003366]">Discover New </span> Games!
      </h2>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {allGames.map((game) => (
          <NewGamesCard key={game._id} game={game} />
        ))}
      </div>
    </div>
  );
}

export default NewGames;

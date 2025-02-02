import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import AdminGameCard from "./AdminGameCard";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function GameController() {
  const { allGames } = useSelector((state) => state.game);
  const navigate = useNavigate();

  const [filteredGames, setFilteredGames] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const games = allGames.filter((game) => {
      const matchesName = game?.gameName
        .toLowerCase()
        .includes(searchInput.toLowerCase());
      const matchesCategory = game?.gameCatagory
        .toLowerCase()
        .includes(searchInput.toLowerCase());

      return matchesName || matchesCategory;
    });
    setFilteredGames(games);
  }, [allGames, searchInput]);

  let content;
  if (searchInput.length === 0) {
    content = (
      <div className="flex-1 h-[88vh]">
        <div className="grid grid-cols-3 gap-4">
          {allGames.map((game) => (
            <AdminGameCard key={game?._id} game={game} />
          ))}
        </div>
      </div>
    );
  } else if (filteredGames.length === 0) {
    content = <span>Not game found</span>;
  } else {
    content = (
      <div className="flex-1 h-[88vh]">
        <div className="grid grid-cols-3 gap-4">
          {filteredGames.map((game) => (
            <AdminGameCard key={game?._id} game={game} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="p-5 rounded-md max-w-5xl mt-5 mx-auto shadow-lg">
        <div className="flex items-center justify-between my-5">
          <Input
            className="w-fit"
            placeholder="Filter by game"
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <Button onClick={() => navigate("/admin/game/create")}>
            Create Game
          </Button>
        </div>
      </div>
      <div className="mt-5 p-5 rounded-md max-w-5xl mx-auto">{content}</div>
    </div>
  );
}

export default GameController;

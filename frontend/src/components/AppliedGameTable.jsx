import React, { useEffect, useState } from "react";
import axios from "axios";
import { REGISTER_IN_GAME_API_END_POINT } from "@/utils/constant.js";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { Calendar, Target, CheckCircle, Clock, XCircle } from 'lucide-react';

function AppliedGameTable() {
  const [appliedGames, setAppliedGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppliedGames = async () => {
      try {
        const response = await axios.get(
          `${REGISTER_IN_GAME_API_END_POINT}/applied-games`,
          { withCredentials: true }
        );

        if (response.data.success) {
          setAppliedGames(response.data.appliedGames);
        }
      } catch (error) {
        console.error("Error fetching applied games:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppliedGames();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (appliedGames.length === 0) {
    return <div>No games applied yet.</div>;
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case 'selected':
        return (
          <Badge className="bg-green-100 text-green-800 flex items-center gap-1">
            <CheckCircle className="w-3 h-3" />
            Selected
          </Badge>
        );
      case 'pending':
        return (
          <Badge className="bg-yellow-100 text-yellow-800 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            Pending
          </Badge>
        );
      case 'rejected':
        return (
          <Badge className="bg-red-100 text-red-800 flex items-center gap-1">
            <XCircle className="w-3 h-3" />
            Rejected
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Applied Games</h2>
        <Badge className="bg-blue-50 text-blue-700">
        {appliedGames.filter(g => g.status === 'selected').length} Games
        </Badge>
      </div>

      <div className="bg-white rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="w-[150px]">Applyed Date</TableHead>
                <TableHead>Game Details</TableHead>
                <TableHead className="w-[150px]">Venue</TableHead>
                <TableHead className="w-[120px] text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {appliedGames.map((game) => (
                <TableRow
                  key={game.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <TableCell className="font-medium">
                    <div className="flex items-start gap-2">
                      <Calendar className="w-4 h-4 text-gray-400 mt-1" />
                      <div>
                        <div className="font-medium text-gray-900">
                          {game.appliedAt.split('T')[0]}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium text-gray-900">{game.gameName}</div>
                      <div className="text-sm text-gray-500 flex items-center gap-1">
                        <Target className="w-3 h-3" />
                        {game.gameName}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-gray-600">
                      {game.venue}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    {getStatusBadge(game.status)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Summary Section */}
        <div className="bg-gray-50 px-6 py-4 border-t">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div>Total Applications: {appliedGames.length}</div>
            <div className="flex gap-4">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                Selected: {appliedGames.filter(g => g.status === 'selected').length}
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                Pending: {appliedGames.filter(g => g.status === 'pending').length}
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                Rejected: {appliedGames.filter(g => g.status === 'rejected').length}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    //  </div >
    // </div >
  );
}

export default AppliedGameTable;
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { Calendar, Trophy, Target, CheckCircle, Clock, XCircle } from 'lucide-react';

function AppliedGameTable() {
  // Sample data - replace with your actual data
  const allAppliedGames = [
    {
      date: '2024-03-12',
      gameName: 'Cricket',
      category: 'Outdoor Game',
      status: 'selected',
      venue: 'Main Ground',
      time: '14:00'
    },
    {
      date: '2024-03-15',
      gameName: 'Chess',
      category: 'Indoor Game',
      status: 'pending',
      venue: 'Sports Complex',
      time: '10:00'
    },
    {
      date: '2024-03-18',
      gameName: 'Football',
      category: 'Outdoor Game',
      status: 'rejected',
      venue: 'Football Ground',
      time: '16:00'
    },
    {
      date: '2024-03-20',
      gameName: 'Table Tennis',
      category: 'Indoor Game',
      status: 'selected',
      venue: 'Indoor Hall',
      time: '11:30'
    },
  ];

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

  if (allAppliedGames.length <= 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <Trophy className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900">No Games Applied</h3>
        <p className="text-gray-500 mt-2">You haven't applied to any games yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="w-[150px]">Date & Time</TableHead>
              <TableHead>Game Details</TableHead>
              <TableHead className="w-[150px]">Venue</TableHead>
              <TableHead className="w-[120px] text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allAppliedGames.map((game, index) => (
              <TableRow 
                key={index}
                className="hover:bg-gray-50 transition-colors"
              >
                <TableCell className="font-medium">
                  <div className="flex items-start gap-2">
                    <Calendar className="w-4 h-4 text-gray-400 mt-1" />
                    <div>
                      <div className="font-medium text-gray-900">
                        {new Date(game.date).toLocaleDateString('en-US', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </div>
                      <div className="text-sm text-gray-500">{game.time}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium text-gray-900">{game.gameName}</div>
                    <div className="text-sm text-gray-500 flex items-center gap-1">
                      <Target className="w-3 h-3" />
                      {game.category}
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
          <div>Total Applications: {allAppliedGames.length}</div>
          <div className="flex gap-4">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              Selected: {allAppliedGames.filter(g => g.status === 'selected').length}
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
              Pending: {allAppliedGames.filter(g => g.status === 'pending').length}
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-red-500"></div>
              Rejected: {allAppliedGames.filter(g => g.status === 'rejected').length}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppliedGameTable;

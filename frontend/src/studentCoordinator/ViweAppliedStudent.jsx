import { Table, TableHead, TableRow, TableCell, TableBody, TableHeader } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { setLoading } from '@/redux/authSlice';
import Navbar from '@/components/shared/Navbar';
import { toast } from 'sonner';
import { useParams } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import * as XLSX from 'xlsx';
import { motion } from 'framer-motion';
import { Download, Users, FileSpreadsheet } from 'lucide-react';

function ViewAppliedStudent() {
  const params = useParams();
  const gameId = params.id;
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  const [players, setPlayers] = useState([]);
  const [gameDetails, setGameDetails] = useState({ name: '', department: '' });

  useEffect(() => {
    const fetchPlayers = async () => {
      dispatch(setLoading(true));
      // console.log("hello");
      
      try {
        const response = await axios.get(`http://localhost:8000/api/v2/registration/${gameId}/getplayers`, { withCredentials: true });
        
        // console.log(response.data)

        if (response.data.success) {
          setPlayers(response?.data?.game?.players);
          setGameDetails({
            name: response?.data?.game?.gameName,
            department: response?.data?.game?.players[0]?.student?.department
          });
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.error(error);
        toast.error('Failed to fetch players');
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchPlayers();
  }, [gameId, dispatch]);

  const handleStatusUpdate = async (registrationId, status) => {
    try {
      dispatch(setLoading(true));
      const response = await axios.post(`http://localhost:8000/api/v2/registration/status/${registrationId}/update`,
        { status },
        { withCredentials: true }
      );

      if (response.data.success) {

        toast.success(response.data.message);
        setPlayers((prevPlayers) =>
          prevPlayers.map((player) =>
            player._id === registrationId ? { ...player, status } : player
          )
        );
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to update status');
    } finally {
      dispatch(setLoading(false));
    }
  };

  const exportToExcel = (filter) => {
    const filteredPlayers = filter === 'selected'
      ? players.filter(player => player.status === 'selected')
      : players;

    const worksheet = XLSX.utils.json_to_sheet([]);

    // Adding title, game name, and department name
    XLSX.utils.sheet_add_aoa(worksheet, [
      ['Charusat University of Science and Technology'],
      [`Game Name: ${gameDetails.name}`],
      [`Department Name: ${gameDetails.department}`],
      [] // Empty row for spacing
    ], { origin: 'A1' });

    // Adding student data
    XLSX.utils.sheet_add_json(worksheet, filteredPlayers.map(player => ({
      Name: player.student.fullname,
      'ID Number': player.student.userId,
      'Mobile Number': player.student.phoneNumber,
      Status: player.status
    })), { origin: -1 });

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Registered Students');

    XLSX.writeFile(workbook, `${filter === 'selected' ? 'Selected' : 'All'}_Students_${gameId}.xlsx`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto p-6 mt-20"
      >
        <div className='flex flex-row justify-between items-center mb-8'>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-full">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Registered Students
            </h1>
          </div>
          <div className="flex gap-4">
            <Button 
              onClick={() => exportToExcel('all')} 
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-all duration-300 flex items-center gap-2 hover:shadow-lg hover:-translate-y-0.5"
            >
              <FileSpreadsheet className="h-4 w-4" />
              Export All
            </Button>
            <Button 
              onClick={() => exportToExcel('selected')} 
              className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-all duration-300 flex items-center gap-2 hover:shadow-lg hover:-translate-y-0.5"
            >
              <Download className="h-4 w-4" />
              Export Selected
            </Button>
          </div>
        </div>  
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="overflow-x-auto">
                  <Table className="w-full">
                    <TableHeader>
                      <TableRow className="bg-gray-50 hover:bg-gray-50">
                        <TableHead className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Name</TableHead>
                        <TableHead className="px-6 py-4 text-sm font-semibold text-gray-700">ID Number</TableHead>
                        <TableHead className="px-6 py-4 text-sm font-semibold text-gray-700">Mobile Number</TableHead>
                        <TableHead className="px-6 py-4 text-sm font-semibold text-gray-700">Status</TableHead>
                        <TableHead className="px-6 py-4 text-sm font-semibold text-gray-700">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {players.map((player, index) => (
                        <motion.tr
                          key={player._id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="border-t hover:bg-gray-50 transition-colors duration-200"
                        >
                          <TableCell className="px-6 py-4 font-medium">{player.student.fullname}</TableCell>
                          <TableCell className="px-6 py-4">{player.student.userId}</TableCell>
                          <TableCell className="px-6 py-4">{player.student.phoneNumber}</TableCell>
                          <TableCell className="px-6 py-4">
                            <Badge 
                              className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
                                player.status === 'selected' 
                                  ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                                  : player.status === 'rejected'
                                  ? 'bg-red-100 text-red-800 hover:bg-red-200'
                                  : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                              }`}
                            >
                              {player.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="px-6 py-4">
                            <div className="flex gap-2">
                              {player.status === 'pending' && (
                                <>
                                  <Button
                                    onClick={() => handleStatusUpdate(player._id, 'selected')}
                                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                                  >
                                    Select
                                  </Button>
                                  <Button
                                    onClick={() => handleStatusUpdate(player._id, 'rejected')}
                                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                                  >
                                    Reject
                                  </Button>
                                </>
                              )}
                              {player.status === 'selected' && (
                                <Button
                                  onClick={() => handleStatusUpdate(player._id, 'rejected')}
                                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                                >
                                  Reject
                                </Button>
                              )}
                              {player.status === 'rejected' && (
                                <Button
                                  onClick={() => handleStatusUpdate(player._id, 'selected')}
                                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                                >
                                  Select
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </motion.tr>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                {players.length === 0 && (
                  <div className="text-center py-12">
                    <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="h-8 w-8 text-gray-400" />
                    </div>
                    <p className="text-gray-500 text-lg">No registered students found.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

export default ViewAppliedStudent;


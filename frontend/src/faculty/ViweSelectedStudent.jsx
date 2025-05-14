import Navbar from "@/components/shared/Navbar";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableHeader,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setLoading } from "@/redux/authSlice";
import { toast } from "sonner";
import { useParams } from "react-router-dom";
import * as XLSX from "xlsx";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Users, FileSpreadsheet, GraduationCap, Phone, IdCard } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const ViweSelectedStudent = () => {
  const params = useParams();
  const gameId = params.id;
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  const [players, setPlayers] = useState([]);
  const [gameDetails, setGameDetails] = useState({ name: "", department: "" });

  useEffect(() => {
    const fetchSelectedPlayers = async () => {
      dispatch(setLoading(true));
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v2/registration/${gameId}/getselectedplayers`,
          { withCredentials: true }
        );
        // console.log(response?.data?.game?.players[0]?.student);

        if (response.data.success) {
          setPlayers(response?.data?.game?.players);
          setGameDetails({
            name: response?.data?.game?.gameName,
            department: response?.data?.game?.players[0]?.student?.department,
          });
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch selected players");
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchSelectedPlayers();
  }, [gameId, dispatch]);

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet([]);

    // Adding title, game name, and department name
    XLSX.utils.sheet_add_aoa(
      worksheet,
      [
        ["Charusat University of Science and Technology"],
        [`Game Name: ${gameDetails.name}`],
        [`Department Name: ${gameDetails.department}`],
        [], // Empty row for spacing
      ],
      { origin: "A1" }
    );

    // Adding selected player data
    XLSX.utils.sheet_add_json(
      worksheet,
      players.map((player) => ({
        Name: player.student.fullname,
        "ID Number": player.student.userId,
        "Mobile Number": player.student.phoneNumber,
        Status: player.status,
      })),
      { origin: -1 }
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Selected Students");

    XLSX.writeFile(workbook, `Selected_Students_${gameId}.xlsx`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <Navbar />
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto p-8 mt-20"
      >
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div className="flex items-center gap-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="p-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg"
            >
              <Users className="h-8 w-8 text-white" />
            </motion.div>
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">
                Selected Students
              </h1>
              <p className="text-gray-600">
                {gameDetails.name} • {gameDetails.department}
              </p>
            </div>
          </div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={exportToExcel}
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-3 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 flex items-center gap-3 shadow-lg hover:shadow-xl"
            >
              <FileSpreadsheet className="h-5 w-5" />
              <span className="font-medium">Export to Excel</span>
            </Button>
          </motion.div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-96">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-blue-600 font-medium">
                Loading...
              </div>
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden">
              <CardContent className="p-8">
                <div className="overflow-x-auto">
                  <Table className="w-full">
                    <TableHeader>
                      <TableRow className="bg-gray-50/50">
                        <TableHead className="px-8 py-6 text-left text-sm font-semibold text-gray-700">
                          <div className="flex items-center gap-2">
                            <GraduationCap className="h-4 w-4 text-blue-500" />
                            Name
                          </div>
                        </TableHead>
                        <TableHead className="px-8 py-6 text-sm font-semibold text-gray-700">
                          <div className="flex items-center gap-2">
                            <IdCard className="h-4 w-4 text-blue-500" />
                            ID Number
                          </div>
                        </TableHead>
                        <TableHead className="px-8 py-6 text-sm font-semibold text-gray-700">
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-blue-500" />
                            Mobile Number
                          </div>
                        </TableHead>
                        <TableHead className="px-8 py-6 text-sm font-semibold text-gray-700">
                          Status
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <AnimatePresence>
                        {players.map((player, index) => (
                          <motion.tr
                            key={player._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ delay: index * 0.1 }}
                            className="border-t border-gray-100 hover:bg-blue-50/50 transition-colors duration-200"
                          >
                            <TableCell className="px-8 py-6">
                              <div className="font-medium text-gray-800">
                                {player?.student?.fullname}
                              </div>
                            </TableCell>
                            <TableCell className="px-8 py-6">
                              <div className="text-gray-600">
                                {player.student.userId}
                              </div>
                            </TableCell>
                            <TableCell className="px-8 py-6">
                              <div className="text-gray-600">
                                {player.student.phoneNumber}
                              </div>
                            </TableCell>
                            <TableCell className="px-8 py-6">
                              <Badge 
                                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
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
                          </motion.tr>
                        ))}
                      </AnimatePresence>
                    </TableBody>
                  </Table>
                </div>
                {players.length === 0 && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-16"
                  >
                    <div className="bg-blue-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Users className="h-10 w-10 text-blue-500" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">No Selected Students</h3>
                    <p className="text-gray-600">There are no students selected for this game yet.</p>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default ViweSelectedStudent;

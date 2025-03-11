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
import useGetAllGame from "@/hooks/useGetAllGame";

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
    <div>
      <Navbar />
      <div className="max-w-6xl  mx-auto p-4">
        <div className="flex flex-row justify-between">
          <h1 className="text-2xl font-bold mb-4">Selected Students</h1>
          <div className="flex gap-4 mb-4">
            <Button
              onClick={exportToExcel}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Export Selected Students
            </Button>
          </div>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <Card className="shadow-lg">
            <CardContent>
              <Table className="w-full border-collapse">
                <TableHeader>
                  <TableRow className="bg-gray-100">
                    <TableHead className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                      Name
                    </TableHead>
                    <TableHead className="px-6 py-3 text-sm font-semibold text-gray-700">
                      ID Number
                    </TableHead>
                    <TableHead className="px-6 py-3 text-sm font-semibold text-gray-700">
                      Mobile Number
                    </TableHead>
                    <TableHead className="px-6 py-3 text-sm font-semibold text-gray-700">
                      Status
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {players.map((player) => (
                    <TableRow key={player._id} className="border-t">
                      <TableCell className="px-6 py-4">
                        {player?.student?.fullname}
                      </TableCell>
                      <TableCell className="px-6 py-4">
                        {player.student.userId}
                      </TableCell>
                      <TableCell className="px-6 py-4">
                        {player.student.phoneNumber}
                      </TableCell>
                      <TableCell className="px-6 py-4 capitalize">
                        {player.status}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {players.length === 0 && (
                <p className="text-center mt-4">No selected students found.</p>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ViweSelectedStudent;

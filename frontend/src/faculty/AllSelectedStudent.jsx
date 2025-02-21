import Navbar from '@/components/shared/Navbar';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import * as XLSX from 'xlsx';

const AllSelectedStudent = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v2/registration/feculty/getallplayers', {
          withCredentials: true
        });
        setPlayers(response.data.players);
      } catch (error) {
        console.error('Error fetching players:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, []);

  const exportToExcel = () => {
    const data = players.map(player => ({
      "Std Id"  : player.userId,
      Fullname: player.fullname,
      Email: player.email,
      PhoneNumber: player.phoneNumber,
      Status: player?.status,
      Game:player?.gameName
    }));

    const worksheet = XLSX.utils.json_to_sheet([]);
    XLSX.utils.sheet_add_aoa(worksheet, [
      ['Charusat University of Science and Technology'],
      ['All Selected Students'],
      []
    ], { origin: 'A1' });


    XLSX.utils.sheet_add_json(worksheet, data, { origin: 'A4', skipHeader: false });

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Players');

    XLSX.writeFile(workbook, 'All_Department_Players.xlsx');
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">All Selected Students</h1>
          <Button onClick={exportToExcel} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            Export to Excel
          </Button>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <Card className="shadow-md">
            <CardContent>
              <Table className="min-w-full bg-white border border-gray-300">
                <TableHeader>
                  <TableRow className="bg-gray-100">
                    <TableHead className="border p-2">Student Id</TableHead>
                    <TableHead className="border p-2">Fullname</TableHead>
                    <TableHead className="border p-2">Email</TableHead>
                    <TableHead className="border p-2">Phone Number</TableHead>
                    <TableHead className="border p-2">Status</TableHead>
                    <TableHead className="border p-2">Game</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {players.map((player, index) => (
                    <TableRow key={index} className="text-center border-t">
                      <TableCell className="border p-2">{player?.userId}</TableCell>
                      <TableCell className="border p-2">{player?.fullname}</TableCell>
                      <TableCell className="border p-2">{player?.email}</TableCell>
                      <TableCell className="border p-2">{player?.phoneNumber}</TableCell>
                      <TableCell className="border p-2 capitalize">{player?.status}</TableCell>
                      <TableCell className="border p-2 capitalize">{player?.gameName}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {players.length === 0 && !loading && (
                <p className="text-center mt-4">No selected students found.</p>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AllSelectedStudent;

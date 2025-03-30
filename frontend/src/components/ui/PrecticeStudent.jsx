import React, { useEffect, useState } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, TableHeader } from '@/components/ui/table';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Users, Trophy } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';
import Navbar from '../shared/Navbar';

function PrecticeStudents() {
    const [loading, setLoading] = useState(true);
    const [practiceSchedules, setPracticeSchedules] = useState([]);
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        const fetchSchedules = async () => {
            try {
                const response = await axios.get(
                    'http://localhost:8000/api/v2/practice/schedule',
                    { withCredentials: true }
                );
                if (response.data.success) {
                    // Filter schedules where the current user is a player
                    const userSchedules = response.data.practice.filter(schedule => 
                        schedule.Players.some(player => player.student === user?._id)
                    );
                    setPracticeSchedules(userSchedules);
                } else {
                    toast.error("Failed to fetch practice schedules");
                }
            } catch (error) {
                console.error("Error fetching schedules:", error);
                toast.error("Failed to load practice schedules");
            } finally {
                setLoading(false);
            }
        };

        if (user?._id) {
            fetchSchedules();
        }
    }, [user?._id]);

    const getPlayerStatus = (schedule) => {
        const player = schedule.Players.find(p => p.student === user?._id);
        return player?.status || 'unknown';
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
            <Navbar/>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-7xl mx-auto mt-16"
            >
                <div className='flex flex-row justify-between items-center mb-8'>
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-blue-100 rounded-full">
                            <Trophy className="h-6 w-6 text-blue-600" />
                        </div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                            My Practice Schedules
                        </h1>
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
                                                <TableHead className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Title</TableHead>
                                                <TableHead className="px-6 py-4 text-sm font-semibold text-gray-700">Game</TableHead>
                                                <TableHead className="px-6 py-4 text-sm font-semibold text-gray-700">Date</TableHead>
                                                <TableHead className="px-6 py-4 text-sm font-semibold text-gray-700">Time</TableHead>
                                                <TableHead className="px-6 py-4 text-sm font-semibold text-gray-700">Venue</TableHead>
                                                <TableHead className="px-6 py-4 text-sm font-semibold text-gray-700">Schedule Status</TableHead>
                                                <TableHead className="px-6 py-4 text-sm font-semibold text-gray-700">Your Status</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {practiceSchedules.map((schedule, index) => (
                                                <motion.tr
                                                    key={index}
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: index * 0.1 }}
                                                    className="border-t hover:bg-gray-50 transition-colors duration-200"
                                                >
                                                    <TableCell className="px-6 py-4 font-medium">{schedule.Title}</TableCell>
                                                    <TableCell className="px-6 py-4">{schedule.Game}</TableCell>
                                                    <TableCell className="px-6 py-4">
                                                        <div className="flex items-center gap-2">
                                                            <Calendar className="h-4 w-4 text-gray-400" />
                                                            {new Date(schedule.Date).toLocaleDateString()}
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="px-6 py-4">
                                                        <div className="flex items-center gap-2">
                                                            <Clock className="h-4 w-4 text-gray-400" />
                                                            {schedule.Time}
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="px-6 py-4">
                                                        <div className="flex items-center gap-2">
                                                            <MapPin className="h-4 w-4 text-gray-400" />
                                                            {schedule.Venue}
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="px-6 py-4">
                                                        <Badge
                                                            className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
                                                                schedule.Status === 'approved'
                                                                    ? 'bg-green-100 text-green-800 hover:bg-green-200'
                                                                    : schedule.Status === 'rejected'
                                                                    ? 'bg-red-100 text-red-800 hover:bg-red-200'
                                                                    : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                                                            }`}
                                                        >
                                                            {schedule.Status}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell className="px-6 py-4">
                                                        <Badge
                                                            className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
                                                                getPlayerStatus(schedule) === 'selected'
                                                                    ? 'bg-green-100 text-green-800 hover:bg-green-200'
                                                                    : getPlayerStatus(schedule) === 'pending'
                                                                    ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                                                                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                                                            }`}
                                                        >
                                                            {getPlayerStatus(schedule)}
                                                        </Badge>
                                                    </TableCell>
                                                </motion.tr>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                                {practiceSchedules.length === 0 && (
                                    <div className="text-center py-12">
                                        <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <Calendar className="h-8 w-8 text-gray-400" />
                                        </div>
                                        <p className="text-gray-500 text-lg">No practice schedules found for you.</p>
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

export default PrecticeStudents; 
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { Calendar, Clock, MapPin, Plus, Loader2, ArrowLeft, Trophy, ChevronDown, CalendarDays, Clock4, MapPinIcon, Calendar as CalendarIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import usePracticeSchedule from "@/hooks/usePracticeSchedule";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import Navbar from "@/components/shared/Navbar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "@/components/ui/badge";

const venues = [
    "Charusat Main Ground",
    "ARIP Ground",
    "Sport Complex",
    "Central Loan",
];

function CreatePracticeSchedule() {
    const { gameId } = useParams();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);
    const { loading, practiceSchedules, error, createPracticeSchedule, fetchPracticeSchedules } = usePracticeSchedule(gameId);
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        practiceDate: "",
        startTime: "",
        endTime: "",
        venue: ""
    });


    useEffect(() => {
        const loadSchedules = async () => {
            try {
                if (gameId) {
                    await fetchPracticeSchedules();
                } else {
                    toast.error("No game selected");
                }
            } catch (error) {
                toast.error("Failed to load schedules");
            }
        };

        loadSchedules();
    }, [gameId, navigate]);

    useEffect(() => {
        if (error) {
            console.error("Error in practice schedules:", error);
            toast.error(error);
        }
    }, [error]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await createPracticeSchedule(formData);
        if (success) {
            setOpen(false);
            setFormData({
                title: "",
                practiceDate: "",
                startTime: "",
                endTime: "",
                venue: ""
            });
            // Refresh the schedules after creating a new one
            fetchPracticeSchedules();
        }
    };

    const calculateDuration = (startTime, endTime) => {
        const start = new Date(`1970-01-01T${startTime}`);
        const end = new Date(`1970-01-01T${endTime}`);
        const diff = end - start;
        return Math.round(diff / (1000 * 60)); // Duration in minutes
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
                            <CalendarIcon className="h-6 w-6 text-blue-600" />
                        </div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                            Practice Sessions
                        </h1>
                    </div>
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                            <Button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-all duration-300 flex items-center gap-2 hover:shadow-lg hover:-translate-y-0.5">
                                <Plus className="h-4 w-4" />
                                Add Practice Session
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px] bg-white rounded-2xl shadow-xl">
                            <DialogHeader>
                                <DialogTitle className="text-2xl font-bold text-gray-800">Schedule New Practice</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleSubmit} className="space-y-6 mt-4">
                                <div className="space-y-2">
                                    <Label htmlFor="title" className="text-gray-700 font-medium">Session Title</Label>
                                    <Input
                                        id="title"
                                        name="title"
                                        placeholder="e.g., Team Practice, Skill Development"
                                        value={formData.title}
                                        onChange={handleChange}
                                        required
                                        className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="practiceDate" className="text-gray-700 font-medium">Practice Date</Label>
                                    <Input
                                        id="practiceDate"
                                        name="practiceDate"
                                        type="date"
                                        value={formData.practiceDate}
                                        onChange={handleChange}
                                        required
                                        className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="startTime" className="text-gray-700 font-medium">Start Time</Label>
                                        <Input
                                            id="startTime"
                                            name="startTime"
                                            type="time"
                                            value={formData.startTime}
                                            onChange={handleChange}
                                            required
                                            className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="endTime" className="text-gray-700 font-medium">End Time</Label>
                                        <Input
                                            id="endTime"
                                            name="endTime"
                                            type="time"
                                            value={formData.endTime}
                                            onChange={handleChange}
                                            required
                                            className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="venue" className="text-gray-700 font-medium">Venue</Label>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger className="w-full flex items-center justify-between px-4 py-2 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors duration-200">
                                            <div className="flex items-center gap-2">
                                                <MapPin className="h-4 w-4 text-gray-400" />
                                                <span className="text-gray-600">{formData.venue || "Select Venue"}</span>
                                            </div>
                                            <ChevronDown className="h-4 w-4 text-gray-400" />
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="w-full">
                                            {venues.map((venue, index) => (
                                                <DropdownMenuItem
                                                    key={index}
                                                    onClick={() => setFormData({ ...formData, venue })}
                                                    className="cursor-pointer hover:bg-blue-50"
                                                >
                                                    {venue}
                                                </DropdownMenuItem>
                                            ))}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                                <Button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5" disabled={loading}>
                                    {loading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Creating...
                                        </>
                                    ) : (
                                        "Schedule Practice"
                                    )}
                                </Button>
                            </form>
                        </DialogContent>
                    </Dialog>
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
                                                <TableHead className="px-6 py-4 text-sm font-semibold text-gray-700">Date</TableHead>
                                                <TableHead className="px-6 py-4 text-sm font-semibold text-gray-700">Time</TableHead>
                                                <TableHead className="px-6 py-4 text-sm font-semibold text-gray-700">Duration</TableHead>
                                                <TableHead className="px-6 py-4 text-sm font-semibold text-gray-700">Venue</TableHead>
                                                <TableHead className="px-6 py-4 text-sm font-semibold text-gray-700">Status</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            <AnimatePresence>
                                                {practiceSchedules?.length > 0 ? (
                                                    practiceSchedules.map((schedule, index) => (
                                                        <motion.tr
                                                            key={schedule._id}
                                                            initial={{ opacity: 0, y: 20 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            transition={{ delay: index * 0.1 }}
                                                            className="border-t hover:bg-gray-50 transition-colors duration-200"
                                                        >
                                                            <TableCell className="px-6 py-4 font-medium">{schedule.title}</TableCell>
                                                            <TableCell className="px-6 py-4">
                                                                <div className="flex items-center gap-2">
                                                                    <CalendarDays className="h-4 w-4 text-gray-400" />
                                                                    {new Date(schedule.practiceDate).toLocaleDateString()}
                                                                </div>
                                                            </TableCell>
                                                            <TableCell className="px-6 py-4">
                                                                <div className="flex items-center gap-2">
                                                                    <Clock4 className="h-4 w-4 text-gray-400" />
                                                                    {schedule.startTime} - {schedule.endTime}
                                                                </div>
                                                            </TableCell>
                                                            <TableCell className="px-6 py-4">{calculateDuration(schedule.startTime, schedule.endTime)} minutes</TableCell>
                                                            <TableCell className="px-6 py-4">
                                                                <div className="flex items-center gap-2">
                                                                    <MapPinIcon className="h-4 w-4 text-gray-400" />
                                                                    {schedule.venue}
                                                                </div>
                                                            </TableCell>
                                                            <TableCell className="px-6 py-4">
                                                                <div className="flex items-center gap-2">
                                                                    <MapPinIcon className="h-4 w-4 text-gray-400" />
                                                                    <Badge variant={schedule.status === 'pending' ? 'default' : schedule.status === 'approved' ? 'success' : 'destructive'}>
                                                                        {schedule.status}
                                                                    </Badge>
                                                                </div>
                                                            </TableCell>
                                                        </motion.tr>
                                                    ))
                                                ) : (
                                                    <TableRow>
                                                        <TableCell colSpan={5} className="text-center py-12">
                                                            <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                                                <CalendarIcon className="h-8 w-8 text-gray-400" />
                                                            </div>
                                                            <p className="text-gray-500 text-lg">No practice schedules found. Create one to get started!</p>
                                                        </TableCell>
                                                    </TableRow>
                                                )}
                                            </AnimatePresence>
                                        </TableBody>
                                    </Table>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
}

export default CreatePracticeSchedule; 
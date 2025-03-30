import React, { useEffect, useState } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, TableHeader } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from "@/components/ui/card";
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { setLoading } from '@/redux/authSlice';
import Navbar from '@/components/shared/Navbar';
import { toast } from 'sonner';
import { useParams, useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import usePracticeSchedule from '@/hooks/usePracticeSchedule';

function ApprovePracticeTime() {
   const params = useParams();
   //  const navigate = useNavigate();
   const dispatch = useDispatch();
   const [gameDetails, setGameDetails] = useState({ name: '', department: '' });
   const { loading, practiceSchedules, fetchPracticeSchedules } = usePracticeSchedule();

   useEffect(() => {
      const loadSchedules = async () => {
         try {
            if (true) {
               await fetchPracticeSchedules();
            } else {
               toast.error("No game selected");

            }
         } catch (error) {
            console.error("Error loading schedules:", error);
            toast.error("Failed to load schedules");
         }
      };

      loadSchedules();
   }, []);


   const handleStatusUpdate = async (practiceId, status) => {
      try {
         dispatch(setLoading(true));
         console.log("Updating practice status:", { practiceId, status });
         const response = await axios.put(
            `http://localhost:8000/api/v2/practice/update/${practiceId}`,
            { status },
            { withCredentials: true }
         );

         if (response.data.success) {
            toast.success("Practice schedule updated successfully");
            await fetchPracticeSchedules();
         } else {
            toast.error(response.data.message);
         }
      } catch (error) {
         console.error("Error updating status:", error);
         toast.error('Failed to update status');
      } finally {
         dispatch(setLoading(false));
      }
   };

   const calculateDuration = (startTime, endTime) => {
      const start = new Date(`1970-01-01T${startTime}`);
      const end = new Date(`1970-01-01T${endTime}`);
      const diff = end - start;
      return Math.round(diff / (1000 * 60));
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
                     <Calendar className="h-6 w-6 text-blue-600" />
                  </div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                     Practice Schedule Approval
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
                                    <TableHead className="px-6 py-4 text-sm font-semibold text-gray-700">Date</TableHead>
                                    <TableHead className="px-6 py-4 text-sm font-semibold text-gray-700">Time</TableHead>
                                    <TableHead className="px-6 py-4 text-sm font-semibold text-gray-700">Duration</TableHead>
                                    <TableHead className="px-6 py-4 text-sm font-semibold text-gray-700">Venue</TableHead>
                                    <TableHead className="px-6 py-4 text-sm font-semibold text-gray-700">Status</TableHead>
                                    <TableHead className="px-6 py-4 text-sm font-semibold text-gray-700">Actions</TableHead>
                                 </TableRow>
                              </TableHeader>
                              <TableBody>
                                 {practiceSchedules.map((schedule, index) => (
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
                                             <Calendar className="h-4 w-4 text-gray-400" />
                                             {new Date(schedule.practiceDate).toLocaleDateString()}
                                          </div>
                                       </TableCell>
                                       <TableCell className="px-6 py-4">
                                          <div className="flex items-center gap-2">
                                             <Clock className="h-4 w-4 text-gray-400" />
                                             {schedule.startTime} - {schedule.endTime}
                                          </div>
                                       </TableCell>
                                       <TableCell className="px-6 py-4">{calculateDuration(schedule.startTime, schedule.endTime)} minutes</TableCell>
                                       <TableCell className="px-6 py-4">
                                          <div className="flex items-center gap-2">
                                             <MapPin className="h-4 w-4 text-gray-400" />
                                             {schedule.venue}
                                          </div>
                                       </TableCell>
                                       <TableCell className="px-6 py-4">
                                          <Badge
                                             className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ${schedule.status === 'approved'
                                                   ? 'bg-green-100 text-green-800 hover:bg-green-200'
                                                   : schedule.status === 'rejected'
                                                      ? 'bg-red-100 text-red-800 hover:bg-red-200'
                                                      : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                                                }`}
                                          >
                                             {schedule.status}
                                          </Badge>
                                       </TableCell>
                                       <TableCell className="px-6 py-4">
                                          <div className="flex gap-2">
                                             {schedule.status === 'pending' ? (
                                                <>
                                                   <Button
                                                      onClick={() => handleStatusUpdate(schedule._id, 'approved')}
                                                      className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 flex items-center gap-2"
                                                   >
                                                      <CheckCircle2 className="h-4 w-4" />
                                                      Approve
                                                   </Button>
                                                   <Button
                                                      onClick={() => handleStatusUpdate(schedule._id, 'rejected')}
                                                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 flex items-center gap-2"
                                                   >
                                                      <XCircle className="h-4 w-4" />
                                                      Reject
                                                   </Button>
                                                </>
                                             ): schedule.status === 'approved' ? (<Button
                                                onClick={() => handleStatusUpdate(schedule._id, 'rejected')}
                                                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 flex items-center gap-2"
                                             >
                                                <XCircle className="h-4 w-4" />
                                                Reject
                                             </Button>) : (<Button
                                                      onClick={() => handleStatusUpdate(schedule._id, 'approved')}
                                                      className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 flex items-center gap-2"
                                                   >
                                                      <CheckCircle2 className="h-4 w-4" />
                                                      Approve
                                                   </Button>)
                                                   }
                                          </div>
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
                              <p className="text-gray-500 text-lg">No practice schedules found.</p>
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

export default ApprovePracticeTime; 
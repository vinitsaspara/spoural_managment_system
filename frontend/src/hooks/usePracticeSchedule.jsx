import axios from 'axios';
import { useState } from 'react';
import { toast } from 'sonner';

const PRACTICE_API_END_POINT = "http://localhost:8000/api/v2/practice";

function usePracticeSchedule(gameId) {
    const [loading, setLoading] = useState(false);
    const [practiceSchedules, setPracticeSchedules] = useState([]);

    const createPracticeSchedule = async (scheduleData) => {
        try {
            setLoading(true);
            const res = await axios.post(
                `${PRACTICE_API_END_POINT}/create/${gameId}`,
                {
                    title: scheduleData.title,
                    practiceDate: scheduleData.practiceDate,
                    startTime: scheduleData.startTime,
                    endTime: scheduleData.endTime,
                    venue: scheduleData.venue
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                }
            );
            if (res.data) {
                toast.success("Practice schedule created successfully");
                setPracticeSchedules(prev => [...prev, res.data]);
                return true;
            }
        } catch (error) {
            console.error("Error creating practice schedule:", error);
            toast.error(error.response?.data?.message || "Failed to create practice schedule");
            return false;
        } finally {
            setLoading(false);
        }
    };

    const fetchPracticeSchedules = async () => {
        try {
            setLoading(true);
            console.log("Fetching practice schedules for gameId:", gameId);
            const res = await axios.get(
                `${PRACTICE_API_END_POINT}/getall`,
                { withCredentials: true }
            );
            console.log("Practice schedules response:", res.data);
            if (res.data) {
                setPracticeSchedules(res.data);
            }
        } catch (error) {
            console.error("Error fetching practice schedules:", error);
            toast.error(error.response?.data?.message || "Failed to fetch practice schedules");
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        practiceSchedules,
        createPracticeSchedule,
        fetchPracticeSchedules
    };
}

export default usePracticeSchedule; 
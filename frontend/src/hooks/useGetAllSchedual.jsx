import { setAllSchedules } from '@/redux/adminSlice';
import { SCHEDUAL_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

function useGetAllSchedual() {
    const dispatch = useDispatch();
    
    useEffect(() => {
        const fetchSchedules = async () => {
            try {
                console.log("Fetching schedules..."); // Debug log
                const res = await axios.get(`${SCHEDUAL_API_END_POINT}/allschedual`, { 
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                console.log("Schedule response:", res.data); // Debug log
                if (res.data.success) {
                    dispatch(setAllSchedules(res.data.schedules));
                }
            } catch (error) {
                console.error("Error fetching schedules:", error);
            }
        };

        fetchSchedules();
    }, []); // Remove dispatch from dependencies to prevent multiple calls
}

export default useGetAllSchedual;

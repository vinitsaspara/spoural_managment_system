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
                const res = await axios.get(`${SCHEDUAL_API_END_POINT}/allschedual`, { withCredentials: true });
                if (res.data.success) {  // Ensure backend sends success field
                    dispatch(setAllSchedules(res.data.schedules));
                }
            } catch (error) {
                console.error("Error fetching schedules:", error);
            }
        };

        fetchSchedules();
    }, [dispatch]);  // Added `dispatch` as a dependency
}

export default useGetAllSchedual;

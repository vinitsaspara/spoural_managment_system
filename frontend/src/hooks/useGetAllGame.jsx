import { setAllGames } from '@/redux/gameSlice';
import { GAME_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';

function useGetAllGame() {

    const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllGames = async () =>{
        try {
            const res = await axios.get(`${GAME_API_END_POINT}/getgame`,{withCredentials:true});
            console.log(res);
            
            if(res.data.success){
                dispatch(setAllGames(res.data.games));
            }

        } catch (error) {
            console.log(error);
        }
    }
    fetchAllGames();
  },[])
}

export default useGetAllGame
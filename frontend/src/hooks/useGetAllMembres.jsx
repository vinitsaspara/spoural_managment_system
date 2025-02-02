import { setAllMembers } from '@/redux/adminSlice';
import { ADMIN_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';

function useGetAllMembres() {

     const dispatch = useDispatch();
    
      useEffect(()=>{
        const getAllMembers = async () =>{
          try {
            const res = await axios.get(`${ADMIN_API_END_POINT}/getallmembers`,{withCredentials:true});
            console.log(res);
            if(res.data.success){
              dispatch(setAllMembers(res.data.members));
            }
          } catch (error) {
              console.log(error);
          }
        }
        getAllMembers();
      },[])
}

export default useGetAllMembres
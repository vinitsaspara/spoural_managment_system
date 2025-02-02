import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        allMembers: [],
        singleMembre: null,
        searchMember:""
    },
    reducers: {
        setAllMembers: (state, action) => {
            state.allMembers = action.payload;
        },
        setSingleMembre: (state, action) => {
            state.singleMembre = action.payload;
        },
        setSearchMember : (state,action)=>{
            state.searchMember = action.payload;
        }
    }
})

export const { setAllMembers, setSingleMembre,setSearchMember } = adminSlice.actions;
export default adminSlice.reducer;
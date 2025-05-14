import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        allMembers: [],
        singleMembre: null,
        searchMember: "",
        allSchedules: [],  // New state for schedules
        singleSchedule: null,  // Stores selected schedule
        searchSchedule: ""  // Search filter for schedules
    },
    reducers: {
        setAllMembers: (state, action) => {
            state.allMembers = action.payload;
        },
        setSingleMembre: (state, action) => {
            state.singleMembre = action.payload;
        },
        setSearchMember: (state, action) => {
            state.searchMember = action.payload;
        },
        setAllSchedules: (state, action) => {
            state.allSchedules = action.payload;
        },
        setSingleSchedule: (state, action) => {
            state.singleSchedule = action.payload;
        },
        setSearchSchedule: (state, action) => {
            state.searchSchedule = action.payload;
        }
    }
});

export const { 
    setAllMembers, 
    setSingleMembre, 
    setSearchMember, 
    setAllSchedules, 
    setSingleSchedule, 
    setSearchSchedule 
} = adminSlice.actions;

export default adminSlice.reducer;

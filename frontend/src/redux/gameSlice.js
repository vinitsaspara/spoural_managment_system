import { createSlice } from "@reduxjs/toolkit";

const gameSlice = createSlice({
    name:'game',
    initialState :{
        allGames:[],
        singleGame : null,
        searchGame : ""
    },
    reducers:{
        setAllGames:(state,action)=>{
            state.allGames = action.payload;
        },
        setSingleGame : (state,action)=>{
            state.singleGame = action.payload;
        },
        setSearchGame : (state,action)=>{
            state.searchGame = action.payload;
        }
    }
})

export const {setAllGames,setSingleGame,setSearchGame} = gameSlice.actions;
export default gameSlice.reducer;
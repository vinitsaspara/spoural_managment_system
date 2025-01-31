import { createSlice } from "@reduxjs/toolkit";

const gameSlice = createSlice({
    name:'game',
    initialState :{
        allGames:[],
        singleGame : null
    },
    reducers:{
        setAllGames:(state,action)=>{
            state.allGames = action.payload;
        },
        setSingleGame : (state,action)=>{
            state.singleGame = action.payload;
        }
    }
})

export const {setAllGames,setSingleGame} = gameSlice.actions;
export default gameSlice.reducer;
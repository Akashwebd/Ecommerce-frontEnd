import {createSlice } from "@reduxjs/toolkit";

const intitialState = false;

const CODSlice = createSlice({
    name:'COD',
    initialState:intitialState,
    reducers:{
       changeCod:(state,action) => {
        return action.payload
       }  
    }
})

export const {changeCod} = CODSlice.actions;
export default CODSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = 'home';

const headerSlice = createSlice({
    name:"header",
    initialState:initialState,
    reducers:{
        setNavOptions:(state,action) =>{
            return action.payload
        }
    }
});

export const {setNavOptions} = headerSlice.actions;
export default headerSlice.reducer;

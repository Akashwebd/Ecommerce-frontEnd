import { createSlice } from "@reduxjs/toolkit";

const initialState={
    text:''
}

const TextSlice = createSlice({
    name:'text',
    initialState:initialState,
    reducers:{
        setText(state,action){
            // console.log(action.payload.email,'zxcv',state);
            return action.payload;
        }
    }
});

export const {setText} = TextSlice.actions;

export default TextSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

const initialState={
    email:'',
    token:''
}

const UserSlice = createSlice({
    name:'user',
    initialState:initialState,
    reducers:{
        loggedIn(state,action){
            console.log(action.payload.email,'zxcv',state);
            return action.payload;
        },
        loggedOut(state,action){
         return action.payload;
        }
    }
});

export const {loggedIn,loggedOut} = UserSlice.actions;

export default UserSlice.reducer;
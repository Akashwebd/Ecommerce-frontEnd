import { createSlice } from "@reduxjs/toolkit";

const initialState=false;

const DrawerSlice = createSlice({
    name:'drawer',
    initialState:initialState,
    reducers:{
        handleDrawer(state,action){
            // console.log(action,'cartlength');
            // console.log(action.payload.email,'zxcv',state);
            return action.payload;
        }
    }
});

export const {handleDrawer} = DrawerSlice.actions;
export default DrawerSlice.reducer;
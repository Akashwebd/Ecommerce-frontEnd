import { createSlice } from "@reduxjs/toolkit";

const initialState=false;

const CouponSlice = createSlice({
    name:'coupon',
    initialState:initialState,
    reducers:{
        handleCouponState(state,action){
            // console.log(action,'cartlength');
            // console.log(action.payload.email,'zxcv',state);
            console.log(action.payload);
            return action.payload;
        }
    }
});

export const {handleCouponState} = CouponSlice.actions;
export default CouponSlice.reducer;
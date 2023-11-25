import { createSlice } from "@reduxjs/toolkit";

console.log(window.localStorage.getItem('cart'),'cartlength')
const initialState={
    cart:window.localStorage.getItem('cart') ? JSON.parse(window.localStorage.getItem('cart')):[]
}

const CartSlice = createSlice({
    name:'cart',
    initialState:initialState,
    reducers:{
        addToCart(state,action){
            console.log(action,'cartlength');
            // console.log(action.payload.email,'zxcv',state);
            return action.payload;
        }
    }
});

export const {addToCart} = CartSlice.actions;
export default CartSlice.reducer;
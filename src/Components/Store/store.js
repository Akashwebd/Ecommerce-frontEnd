import { configureStore } from '@reduxjs/toolkit';
import UserReducer from './Slices/UserSlice';
import TextReducer from './Slices/TextSlice';
import CartReducer from './Slices/CartSlice';
import DrawerReducer from './Slices/DrawerSlice';
import CouponReducer from './Slices/CouponSlice';
import CODReducer from './Slices/CODSlice'; 
import HeaderSlice from './Slices/HeaderSlice';

const Store = configureStore({
    reducer:{
        user:UserReducer,
        filterText:TextReducer,
        cart:CartReducer,
        drawer:DrawerReducer,
        couponApplied:CouponReducer,
        cod:CODReducer,
        header:HeaderSlice
    }
});
export default Store;
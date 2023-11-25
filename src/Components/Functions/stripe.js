import axios from "axios";

export const createPaymentIntent= async (token,coupon) =>{
    console.log(coupon,'createUser');
    return await axios.post(`${process.env.REACT_APP_API_END_POINT}/create-payment-intent`,coupon,{
                    headers:{
                        token:token
                    }
                })
}
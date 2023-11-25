import axios from "axios";

export const getCoupons= async () =>{
    // console.log(process.env.REACT_APP_API_END_POINT,'createUser');
    return await axios.get(`${process.env.REACT_APP_API_END_POINT}/coupon`,{})
}

export const deleteCoupon = async (id,token) =>{
    console.log(token,'createToken');
    return await axios.delete(`${process.env.REACT_APP_API_END_POINT}/coupon/${id}`,{
                    headers:{
                        token:token
                    }
                })

}

export const CreateCoupon = async (newcoupon,token) =>{
    // console.log(process.env.REACT_APP_API_END_POINT,'createUser');
    return await axios.post(`${process.env.REACT_APP_API_END_POINT}/coupon`,newcoupon,{
                    headers:{
                        token:token
                    }
                })
}

export const applyCoupon = async(coupon,token) =>{
    return await axios.post(`${process.env.REACT_APP_API_END_POINT}/user/cart/coupon`,coupon,{
        headers:{
            token:token
        }
    })
}
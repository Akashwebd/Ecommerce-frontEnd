import axios from "axios";

export const CreateOrder = async (stripeResponse,token) =>{
    // console.log(process.env.REACT_APP_API_END_POINT,'createUser');
    return await axios.post(`${process.env.REACT_APP_API_END_POINT}/user/order`,stripeResponse,{
                    headers:{
                        token:token
                    }
                })
}

export const getOrders = async (token) =>{
    return await axios.get(`${process.env.REACT_APP_API_END_POINT}/user/orders`,{
                    headers:{
                        token:token
                    }
                })
}

export const createCodOrder = async(token,cod) =>{
    return await axios.post(`${process.env.REACT_APP_API_END_POINT}/user/cash-order`,{cod},{
        headers:{
            token:token
        }
    })
}
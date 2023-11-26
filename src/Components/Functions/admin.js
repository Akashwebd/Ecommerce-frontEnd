import axios from "axios";

export const getAllOrders = async(token) =>{
    return await axios.get(`${process.env.REACT_APP_API_END_POINT}/admin/orders`,{
        headers:{
            token:token
        }
    })
} 

export const updateOrderStatus = async(id,status,token) =>{
    return await axios.put(`${process.env.REACT_APP_API_END_POINT}/admin/order-status`,{id,status},{
        headers:{
            token:token
        }
    })
}
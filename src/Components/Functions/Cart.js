import axios from "axios"

export const saveCart = async(cart,token) =>{
    return await axios.post(`${process.env.REACT_APP_API_END_POINT}/user/cart`,cart,{
        headers:{
            token:token
        }
    })
}

export const getCart = async(token) =>{
    console.log(token,'checktoken');
    return await axios.get(`${process.env.REACT_APP_API_END_POINT}/user/cart`,{
        headers:{
            token:token
        }
    })
}

export const deleteCart= async (token) =>{
    console.log(token,'createToken');
    return await axios.delete(`${process.env.REACT_APP_API_END_POINT}/user/cart`,{
                    headers:{
                        token:token
                    }
                })

}

export const saveAddress = async(address,token) =>{
    return await axios.post(`${process.env.REACT_APP_API_END_POINT}/user/address`,address,{
        headers:{
            token:token
        }
    })
}
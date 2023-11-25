import axios from "axios";

export const CreateOrder = async (stripeResponse,token) =>{
    // console.log(process.env.REACT_APP_API_END_POINT,'createUser');
    return await axios.post(`${process.env.REACT_APP_API_END_POINT}/user/order`,stripeResponse,{
                    headers:{
                        token:token
                    }
                })
}
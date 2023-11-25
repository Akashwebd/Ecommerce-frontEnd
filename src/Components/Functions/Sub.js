import axios from "axios";

export const createSub = async (newSub,token) =>{
    console.log(newSub,'createUser');
    return await axios.post(`${process.env.REACT_APP_API_END_POINT}/sub`,newSub,{
                    headers:{
                        token:token
                    }
                })

}

export const updateSub= async (slug,sub,token) =>{
    console.log(process.env.REACT_APP_API_END_POINT,'createUser');
    return await axios.put(`${process.env.REACT_APP_API_END_POINT}/sub/${slug}`,sub,{
                    headers:{
                        token:token
                    }
                })

}

export const getSubs = async () =>{
    console.log(process.env.REACT_APP_API_END_POINT,'createUser');
    return await axios.get(`${process.env.REACT_APP_API_END_POINT}/subs`,{})
}

export const getSub = async (slug) =>{
    console.log(process.env.REACT_APP_API_END_POINT,'createUser');
    return await axios.get(`${process.env.REACT_APP_API_END_POINT}/sub/${slug}`,{})
}

export const deleteSub = async (slug,token) =>{
    console.log(token,'createToken');
    return await axios.delete(`${process.env.REACT_APP_API_END_POINT}/sub/${slug}`,{
                    headers:{
                        token:token
                    }
                })

}
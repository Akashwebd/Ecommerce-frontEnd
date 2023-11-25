import axios from "axios"

export const createOrUpdateUser = async (token) =>{
    console.log(process.env.REACT_APP_API_END_POINT,'createUser');
    return await axios.post(`${process.env.REACT_APP_API_END_POINT}/create-update-user`,{},{
                    headers:{
                        token:token
                    }
                })

}

export const currentUser = async (token) => {
    return await axios.post(`${process.env.REACT_APP_API_END_POINT}/current-user`,{},{
        headers:{
            token:token
        }
    })
}

export const currentAdmin = async(token) => {
    return await axios.post(`${process.env.REACT_APP_API_END_POINT}/current-admin`,{},{
        headers:{
            token:token
        }
    }) 
}
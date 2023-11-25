import axios from "axios";

export const createCategory = async (newCategory,token) =>{
    console.log(process.env.REACT_APP_API_END_POINT,'createUser');
    return await axios.post(`${process.env.REACT_APP_API_END_POINT}/category`,newCategory,{
                    headers:{
                        token:token
                    }
                })

}

export const updateCategory= async (slug,category,token) =>{
    console.log(process.env.REACT_APP_API_END_POINT,'createUser');
    return await axios.put(`${process.env.REACT_APP_API_END_POINT}/category/${slug}`,category,{
                    headers:{
                        token:token
                    }
                })

}

export const getCategories = async () =>{
    console.log(process.env.REACT_APP_API_END_POINT,'createUser');
    return await axios.get(`${process.env.REACT_APP_API_END_POINT}/categories`,{})
}

export const getCategory = async (slug) =>{
    console.log(process.env.REACT_APP_API_END_POINT,'createUser');
    return await axios.get(`${process.env.REACT_APP_API_END_POINT}/category/${slug}`,{})
}

export const deleteCategory = async (slug,token) =>{
    console.log(token,'createToken');
    return await axios.delete(`${process.env.REACT_APP_API_END_POINT}/category/${slug}`,{
                    headers:{
                        token:token
                    }
                })

}
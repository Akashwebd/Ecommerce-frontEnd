import axios from "axios";

export const createProduct = async (newProduct,token) =>{
    console.log(newProduct,token);
    return await axios.post(`${process.env.REACT_APP_API_END_POINT}/product`,newProduct,{
                    headers:{
                        token:token
                    }
                })

}

export const getSub = async(id) =>{
    return await axios.get(`${process.env.REACT_APP_API_END_POINT}/category/sub/${id}`,{});
}

export const allProduct = async(count) =>{
    return await axios.get(`${process.env.REACT_APP_API_END_POINT}/products/${count}`,{});
}

export const productByFilter = async(query) =>{
    return await axios.post(`${process.env.REACT_APP_API_END_POINT}/search/filter`,query);
}

export const deleteProduct = async (slug,token) =>{
    // console.log(newProduct,token);
    return await axios.delete(`${process.env.REACT_APP_API_END_POINT}/product/${slug}`,{
                    headers:{
                        token:token
                    }
                })

}

export const getProduct = async(slug) =>{
    return await axios.get(`${process.env.REACT_APP_API_END_POINT}/product/${slug}`,{});
}

export const updateProduct = async (slug,product,token) =>{
    return await axios.put(`${process.env.REACT_APP_API_END_POINT}/product/${slug}`,product,{
        headers:{
            token:token
        }
    })
}

export const fetchCertainProduct = async(sort,order,page) =>{
    return await axios.post(`${process.env.REACT_APP_API_END_POINT}/products`,{
        sort,
        order,
        page
    });    
}

export const productCount = async() =>{
    return await axios.get(`${process.env.REACT_APP_API_END_POINT}/product/total`);
}

export const create_update_Rating = async(id,token,star) =>{
    console.log(token,'checktoken');
    return await axios.post(`${process.env.REACT_APP_API_END_POINT}/product/star/${id}`,{star:star},{       
    headers:{
        token:token
    }
})  
}

export const relatedProduct = async(id) => {
    return await axios.get(`${process.env.REACT_APP_API_END_POINT}/product/related/${id}`);
}

////////////////////////////// wishlist ////////////////////////////////////

export const createWishlist = async (id,token) =>{
    return await axios.post(`${process.env.REACT_APP_API_END_POINT}/user/wishlist`,{id},{       
        headers:{
            token:token
        }
    })   
}

export const getAllWishlist = async(token) => {
    return await axios.get(`${process.env.REACT_APP_API_END_POINT}/user/wishlist`,{       
        headers:{
            token:token
        }
    })  
}

export const deleteWishList =async(id,token) =>{
    return await axios.put(`${process.env.REACT_APP_API_END_POINT}/user/wishlist/${id}`,{},{       
        headers:{
            token:token
        }
    })  
}
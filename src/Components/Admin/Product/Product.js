import React, { useEffect, useState } from "react";
import { allProduct,deleteProduct } from "../../Functions/Product";
import AdminNav from "../Nav/AdminNav";
import AdminCart from "../../Cart/AdminCart";
import {toast} from 'react-toastify';
import { useSelector } from "react-redux";
// import { all } from "../../../../../server/Routes/cloudinary";

function Product(){
    const [allList,setList] =useState([]);
    const [loading,setLoading] =useState(false);
    const {user} = useSelector(state => state);

useEffect(()=>{
   getList();
 },[]);
 
const getList = () =>{
    setLoading(true);
    allProduct(10).
        then(res =>{
            setList(res.data);
            setLoading(false);
            }).
        catch(error =>{
            console.log(error);
            setLoading(false);
        })
}

const handleRemove = async (slug) =>{
    // setLoading(true);
    try{
        const product = await deleteProduct(slug,user.token);
        console.log(product);
        toast.success(`${product.data.title} is Deleted Successfully`,{
            position:toast.POSITION.TOP_RIGHT
        });
      getList();
    }catch(error){
    toast.error(error.response.data,{
        position:toast.POSITION.TOP_RIGHT  
    })
    }
}
return(
    <div className="container-fluid">
    <div className="row">
        <div className="col-md-2">
         <AdminNav/>
        </div>
        <div className="col">
            <div className="row">
            {loading ? <h1 className="text-danger">Loading</h1> :
                allList.map(item =>( 
                    <div className="col-md-4" key={item._id}>
                    <AdminCart product={item} handleRemove={handleRemove}/>
                    </div>
                ))}
            </div>
        </div>
    </div>

</div>
)


}

export default Product
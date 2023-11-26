import React, { useEffect, useState } from "react";
import UserNav from "./Nav/UserNav";
import { Link } from "react-router-dom";
import { DeleteOutlined } from "@ant-design/icons";
import { deleteWishList,getAllWishlist } from "../Functions/Product";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import PageLoader from "../PageLoader";

function Wishlist(){
    const [wishlist,setWishList] = useState([]);
    const [loading,setLoading] = useState(false); 
    const {user} = useSelector(state => ({...state}));
    useEffect(()=>{
   loadWishlist();
    },[]);

    const loadWishlist = async() =>{
        setLoading(true)
        try{
            const response = await getAllWishlist(user.token);
            console.log(response,'check123');
            setWishList(response.data.wishlist);
            setLoading(false);
        }catch(error){
            console.log(error);
        }finally{
            setLoading(false);
        }
    }

    const handleRemove =async id =>{
    const response = await deleteWishList(id,user.token);
    if(response.data.ok){
        toast.success('Product Removed Successfully from Wishlist',{
            position:toast.POSITION.TOP_RIGHT
        });
     loadWishlist();
    }
    }
 return(
    <div className="container-fluid">
    <div className="row">
        <div className="col-md-2">
         <UserNav/>
        </div>
        <div className="col">
            {loading? <PageLoader/>:
            <>
                <h1 className="text-center">WishList</h1>
                {   
                    wishlist.length ? (wishlist.map(item =>(
                        <div key={item._id} className="alert alert-secondary">
                        <Link to={`/product/${item.slug}`}>{item.title}</Link>
                        <span className="btn btn-sm float-right" onClick={()=> handleRemove(item._id)}>
                            <DeleteOutlined className="text-danger"/>
                        </span>
                        </div> 
    
                    ))):<h4 className="text-center">No Product in WishList</h4>
                }
                </>  
            }
        </div>

    </div>

</div>
)

}

export default Wishlist;
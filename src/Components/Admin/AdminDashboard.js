import React, { useEffect, useState } from "react";
import AdminNav from "./Nav/AdminNav";
import { useSelector } from "react-redux";
import { getAllOrders,updateOrderStatus } from "../Functions/admin";
import PageLoader from "../PageLoader";
import { toast } from "react-toastify";
import Orders from "./Orders";

function AdminDashboard(){
 const [orders,setOrders] = useState([]);
 const [loading,setLoading] = useState(false);
 const {user} = useSelector(state => ({...state}));

 useEffect(()=>{
  getOrders();
 },[])

 const getOrders = async() =>{
    setLoading(true);
  try{
    const response = await getAllOrders(user.token);
    setOrders(response.data);
    console.log(response.data,'checkresponse');
  }catch(error){
    console.log(error);
  }finally{
    setLoading(false);
  }
 }

 const handleStatusChange = async(orderId,orderStatus) =>{
    const response = await updateOrderStatus(orderId,orderStatus,user.token);
    toast.success('Status Updated Successfully',{
        position:toast.POSITION.TOP_RIGHT
    });
    getOrders();
 }

return(
    <div className="container-fluid">
    <div className="row">
        <div className="col-md-2">
         <AdminNav/>
        </div>
        <div className="col-md-10">
            {loading ? <PageLoader/>:
            <>
             <h4 className="text-center display-4 pt-3">Admin Dashboard</h4>
             <Orders orders={orders} handleStatusChange={handleStatusChange}/>
            </>
            }
        </div>

    </div>

</div>
)

}

export default AdminDashboard;
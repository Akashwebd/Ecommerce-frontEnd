import React,{useEffect, useState} from "react";
import AdminNav from "./Nav/AdminNav";
import DatePicker from 'react-datepicker';
import { useSelector,useDispatch } from "react-redux";
import {toast} from 'react-toastify';
import "react-datepicker/dist/react-datepicker.css";
import { getCoupons,CreateCoupon as AddCoupon,deleteCoupon } from "../Functions/Coupon";
import { DeleteOutlined } from "@ant-design/icons";



function CreateCoupon(){
    const [name,setName] = useState('');
    const [discount,setDiscount] = useState('');
    const [expiry,setExpiry] = useState(new Date());
    const [loading,setLoading] = useState(false);
    const [coupon,setCoupon] = useState([]);
    const {user} = useSelector(state => ({...state}));

    const handleSubmit = async(e) =>{
    e.preventDefault();
    // setLoading(true);
    try{
     const response = await AddCoupon({name,discount,expiry},user.token);
     toast.success(`${response.data.name} created Successsfully`,{
        position:toast.POSITION.TOP_RIGHT
     });
     loadCouponDetails();
     setName('');
     setDiscount('');
     setExpiry(new Date());
    }catch(error){
        console.log(error)
        toast.error(error.response.data.err,{
            position:toast.POSITION.TOP_RIGHT
         });
    }
    }

    const loadCouponDetails = async() =>{
        setLoading(true);
    try{
        const response  = await getCoupons();
        console.log(response,'checkcoupon');
        setCoupon(response.data);
    }catch(error){
     console.log(error);
    }finally{
        setLoading(false);
    }
    }

    useEffect(()=>{
        loadCouponDetails();
    },[]);

    const handleDelete = async(id) =>{
        try{
            const response = await deleteCoupon(id,user.token);
            toast.success(`${response.data.name} Deleted Successsfully`,{
                position:toast.POSITION.TOP_RIGHT
             });
             loadCouponDetails();
        }catch(error){
       console.log(error);
        }

    }


    const couponForm = () =>(
        <>
        <h4 className="display-4 text-center">Coupons</h4>
        <form onSubmit={handleSubmit}>
            <div className="form-group">
            <label className="text-muted">Name</label>
            <input type="text" className="form-control" onChange={(e) => setName(e.target.value)} value={name} autoFocus required/>
            </div>
            <div className="form-group">
            <label className="text-muted">Discount %</label>
            <input type="number" className="form-control" onChange={(e) => setDiscount(e.target.value)} value={discount} autoFocus required/>
            </div>
            <div className="form-group">
            <label className="text-muted pr-2">Expiry</label>
            <DatePicker
            className="form-control"
            selected={expiry}
            // value={expiry}
            onChange={(date) =>{console.log(date);setExpiry(date)}}
            required
            />
            </div>
            <button type="submit" className="btn btn-outline-primary">
                Save
            </button>
        </form>
        </>
    )
 console.log(coupon,'checkcoupon');
return(
    <div className="container-fluid">
    <div className="row">
        <div className="col-md-2">
         <AdminNav/>
        </div>
        <div className="col-md-6 offset-md-2 mt-3">
            {couponForm()}
            <h4 className="display-4 text-center">Coupons - <span className="font-weight-bold">{coupon.length}</span></h4>
            <table className="table table-bordered">
            <thead className="thead-light">
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Discount</th>
                    <th scope="col">Expiry</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    coupon.map(item =>(
                        <tr key={item._id}>
                            <td>{item.name}</td>
                            <td>{item.discount}</td>
                            <td>{new Date(item.expiry).toLocaleDateString()}</td>
                            <td><DeleteOutlined className="text-danger" onClick={() =>handleDelete(item._id)}/></td>
                        </tr>
                    ))
                }
            </tbody>

            </table>
        </div>
    </div>
    </div>
)

}

export default CreateCoupon;
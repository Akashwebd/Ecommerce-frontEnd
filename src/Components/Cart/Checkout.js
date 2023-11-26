import React, { useEffect, useState } from "react";
import { getCart,deleteCart,saveAddress } from "../Functions/Cart";
import { createCodOrder } from "../Functions/order";
import { applyCoupon } from "../Functions/Coupon";
import {useSelector,useDispatch} from 'react-redux';
import { addToCart } from "../Store/Slices/CartSlice";
import {toast} from 'react-toastify';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { handleCouponState } from "../Store/Slices/CouponSlice";
import { Input, Space } from 'antd';
import { changeCod } from "../Store/Slices/CODSlice";
const { Search } = Input;


function CheckOut({history}){
  const [productDetails,setProductDeatils] = useState({});
  const {user,cod} = useSelector(state =>({...state}));
  const [coupon,setCoupon] = useState('');
  const [addressStatus,setAddressStatus] = useState(false);
  const [address,setAddress] = useState('');
  const [discountedPrice,setDiscountedPrice] = useState(0);
  const dispatch  = useDispatch();

  useEffect(()=>{
    // dispatch(handleCouponState(false));
  getDetails();
  },[])
  
  const getDetails = async() =>{
    console.log(user.token,'usercheck')
   const response = await getCart(user.token);
   console.log(response);
   setProductDeatils(response.data.details);
  }

  const handleClear = async (e) =>{
    e.preventDefault();
    const response = await deleteCart(user.token);
    if(response.data.ok){
      console.log(user.token,'usercheck')
      localStorage.removeItem('cart');
      dispatch(addToCart({cart:[]}));
      setProductDeatils({});
      setDiscountedPrice(0);
      toast.success('Cart Cleared Successfully',{
      position:toast.POSITION.TOP_RIGHT
      });
    }
  }

  const handleAddress = async () =>{
    const response  = await saveAddress({address},user.token);
    if(response.data.ok){
      toast.success('Address Added Succesfully',{
        position:toast.POSITION.TOP_RIGHT
      });
      setAddressStatus(true);
    }

  }

  const handleCoupon = async() =>{
    try{
      const response = await applyCoupon({coupon},user.token)
      setDiscountedPrice(response.data.totalAfterDiscount);
      toast.success('Coupon Applied Successfully',{
        position:toast.POSITION.TOP_RIGHT
      })
      setCoupon('');
    }catch(error){
      console.log(error);
      toast.error(error.response.data,{
        position:toast.POSITION.TOP_RIGHT
      })
    }
  }

  const showCoupon = () =>(
    <div className="border p-3">
    <p className="display-4">Coupons</p>
    <Space direction="vertical">
    <Search
      placeholder="input search text"
      allowClear
      enterButton="Apply"
      size="large"
      autoSize={true}
      disabled={!productDetails?.products?.length}
      value={coupon}
      onChange={(e) => setCoupon(e.target.value)}

      // className="text-center"
      onSearch={handleCoupon}
    />
    </Space>
    </div>
  )

  const handlePlaceOrder = async() =>{
    if(discountedPrice>0){
      dispatch(handleCouponState(true));
    }
    if(cod){
     const response = await createCodOrder(user.token,cod);
     if(response.data.ok){
      toast.success('Ordered Placed Successfully',{
        position:toast.POSITION.TOP_RIGHT
       })
       await deleteCart(user.token);
       //empty localStorage
       window.localStorage.removeItem('cart');

       //empty redux
       dispatch(addToCart({cart:[]}));
       
       //empty coupon
       dispatch(handleCouponState(false));

       //empty cod
       dispatch(changeCod(false));


     }
    //  history.push('/user/history');
    }else{
      history.push('/payment');
    }
  }

console.log(address);
 return(
    <div className="container-fluid"> 
    <div className="row">
        <div className="col-md-6 mt-3">
          <h4>Delivery Address</h4>
          <br/>
          <ReactQuill theme="snow"  onChange={setAddress}/>
          <br/>
          <button className="btn btn-primary mt-2" disabled={!address.length} onClick={handleAddress}>
           Save
          </button>
          <hr/>
             {showCoupon()}
          </div>
        <div className="col-md-6 mt-3">
          <div className="border p-3">
          <h4> Order Summary</h4>
          <hr/>
          <p>Products {productDetails?.products?.length ? productDetails?.products?.length : 0}</p>
          <hr/>
           <p>List of Products</p>
           {productDetails?.products?.length ? (
            productDetails.products.map(item =>(
              <p>
                {item.product.title}({item.color})*{item.count} = {" "}
                ${item.price * item.count}
              </p>
            ))
           ):<p className="text-center">No Products</p>}
           <hr/>
           <p>Cart Total : ${productDetails?.cartTotal}</p>
           {
            discountedPrice>0 && (
              <p className="bg-success p-2">
                Discount Applied: Total Payable: ${discountedPrice}
              </p>
            )
           }
           <div className="row">
              <div className="col-md-6">
                <button className="btn btn-primary" disabled={!addressStatus || !productDetails?.products?.length} onClick={handlePlaceOrder}>Place Order</button>
              </div>
              <div className="col-md-6">
                {console.log(productDetails)}
                <button className="btn btn-primary" onClick={handleClear} disabled={!Object.keys(productDetails).length}>Clear Cart</button>
              </div>
           </div>
           </div>
        </div>

    </div>

    </div>
 )
}
export default CheckOut;
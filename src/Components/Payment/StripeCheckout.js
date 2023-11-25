import React, { useEffect, useState } from "react";
import { CardElement,useElements,useStripe } from "@stripe/react-stripe-js";
import {useSelector,useDispatch} from 'react-redux';
import { createPaymentIntent } from "../Functions/stripe";
import {Link} from 'react-router-dom';
import { Card } from "antd";
import { DollarOutlined,CheckOutlined } from "@ant-design/icons";
import { CreateOrder } from "../Functions/order";
import { addToCart } from "../Store/Slices/CartSlice";
import { handleCouponState } from "../Store/Slices/CouponSlice";
import { deleteCart } from "../Functions/Cart";
import Laptop from '../../Images/laptop.jpg';

const cartStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

function StripeCheckOut({history}){
    const dispatch = useDispatch();
    const {user,couponApplied} = useSelector(state => ({...state}));
    const stripe = useStripe();
    const elements = useElements();
    const [succeeded,setSucceeded] = useState(false);
    const [error,setError] = useState(null);
    const [processing,setProcessing] = useState(false);
    const [disabled,setDisabled] = useState(false);
    const [clientSecret,setClientSecret] = useState("");
    const [amountResponse,setAmountResponse] = useState({});

    useEffect(()=>{
        (async() =>{
            console.log(couponApplied)
            const response = await createPaymentIntent(user.token,{couponApplied});
            setClientSecret(response.data.clientSecret);
            setAmountResponse({
                cartTotal:response.data.cartTotal,
                totalAfterDiscount:response.data.totalAfterDiscount,
                finalAmount:response.data.payable
            })
        })();
    },[])

const handleSubmit = async(e) =>{
e.preventDefault();
setProcessing(true);
const payload = await stripe.confirmCardPayment(clientSecret,{
    payment_method:{
        card:elements.getElement(CardElement),
        billing_details:{
            name:e.target.name.value
        }
    }
})
if(payload.error){
    setError(`Payment Failed ${payload.error.message}`)
    setProcessing(false);
}else{
    setError(null);
    setProcessing(false);
    setSucceeded(true);
    CreateOrder({stripeResponse:payload},user.token).then(res =>{
        if(res.data.ok){
        window.localStorage.removeItem('cart');
        dispatch(addToCart({cart:[]}));
        dispatch(handleCouponState(false));
        deleteCart(user.token);
        }
    }).catch(error =>{
        console.log(error);
    })

}
}

const handleChange = (e)=>{
    console.log(e);
    setDisabled(e.empty);
    setError(e.error?e.error.message:null);
}

return(
    <>
    {
        !succeeded && <div>
            {
                couponApplied && amountResponse.totalAfterDiscount!==undefined ? (
                    <p className="aler alert-success">Total After Discount ${amountResponse.totalAfterDiscount}</p>
                ): <p className="aler alert-danger">No Coupon Applied</p>
            }
        </div>
    }
    <div className="text-center pb-5">
     <Card
    //  cover={
    //     <img
    //     src={Laptop}
    //     style={{
    //         height:"auto",
    //         objectFit:'cover',
    //         // marginBottom:'-50px',
    //         width:"200px",
    //         margin:"auto"

    //     }}
    //     />
    //  }
     actions={[
        <>
        <DollarOutlined className="text-info"/><br/>Total ${amountResponse.cartTotal}
        </>,
        <>
        <CheckOutlined className="text-info"/><br/>Total Payable ${(amountResponse.finalAmount/100).toFixed(2)}
        </>
     ]}
     /> 
    </div>
    <form id='payment-form' className="stripe-form" onSubmit={handleSubmit}>
    <CardElement
    id="card-element"
    options={cartStyle}
    onChange={handleChange}
    />
    <button className="stripe-button" disabled={processing||disabled||succeeded}>
        <span id='button-text'>
            {processing?<div className="spinner" id="spinner"></div>:"Pay"}

        </span>

    </button>
    <br/>
    {error && <div className="card-error text-danger" role="alert">{error}</div>}
    <p className={succeeded?"result-message" : "result-message hidden"}>
     Payment Successfull<Link to='/user/history'>See it in your Purchase History</Link>
    </p>
    </form>
    </>
)
}

export default StripeCheckOut;
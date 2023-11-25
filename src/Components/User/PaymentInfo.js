import React from "react";

function PaymentInfo({order}){
    const {paymentIntent} =order;
return(
    <p>
        <span><b>Order Id: </b>{order._id}</span>{"/"}
        <span><b>Amount: </b> {(paymentIntent.amount/100).toLocaleString('en-US',{
            style:'currency',
            currency:"USD"
        })}</span>{"/"}
        <span><b>Currency: </b>USD Method</span>{"/"}
        <span><b>Method: </b>{paymentIntent.payment_method_types[0].toUpperCase()}</span>{"/"}
        <span><b>Payment Status: </b>{paymentIntent.status.toUpperCase()}</span>{"/"}
        <span><b>Ordered On:</b>{new Date(paymentIntent.created*1000).toLocaleString()}</span>{"/"}
        <br/>
        <br/>
        <span className="bg bg-primary text-white p-1">Ordered Status: {order.orderStatus}</span>
    </p>
)

}

export default PaymentInfo;
import React, { useState } from "react";
import PaymentInfo from "../User/PaymentInfo";
import { Select } from 'antd';
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

function Orders({orders,handleStatusChange}){
    // const [value,setValue] = useState('Not Processed');

    const handleChange = (id,status) =>{
        // setValue(val);
        handleStatusChange(id,status);
    }

    const showOrderTable = (product) =>{
       return <table className="table table-bordered">
        <thead className="thead-light">
            <tr>
                <th scope="col">Title</th>
                <th scope="col">Price</th>
                <th scope="col">Brand</th>
                <th scope="col">Color</th>
                <th scope="col">Count</th>
                <th scope="col">Shipping</th>
            </tr>
        </thead>
        <tbody>
            {product?.map((item,i) =>(
                <tr key={i}>
                    <td><b>{item.product.title}</b></td>
                    <td>{item.product.price}</td>
                    <td>{item.product.brand}</td>
                    <td>{item.product.color}</td>
                    <td>{item.count}</td>
                    <td>{item.product.shipping === "Yes" ?
                     <CheckOutlined style={{color:"green"}}/>:<CloseOutlined style={{color:"red"}}/>
                }</td>

                </tr>
            ))}
        </tbody>
    </table>
    }
return(
    <>
    {
     orders.map(item =>(
        <div key={item._id} className="text-center bg-light btn btn-block mt-5">
        <PaymentInfo order={item} check={false}/>
        <div className="row p-1">
         <div className="col-md-4">
          <h5 className="float-right p-1">Delivery Status</h5>
         </div>
         <div className="col-md-8 float-left">
            <Select
            size="large"
            value={item.orderStatus}
            onChange={(value) => handleChange(item._id,value)}
            className="float-left"
            style={{
            width: 200,
            }}
            options={['Not Processed','Processing','Dispatched','Cancelled','Delivered'].map(item => ({label:item,value:item}))}
        />
         </div>
        </div>
        <div className="row">
        {showOrderTable(item.products)}
        </div>
        </div>
     ))
    }
    </>
)

}

export default Orders;
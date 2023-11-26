import React, { useEffect, useState } from "react";
import UserNav from "./Nav/UserNav";
import { getOrders } from "../Functions/order";
import { useSelector } from "react-redux";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import PaymentInfo from "./PaymentInfo";
import { PDFDownloadLink } from '@react-pdf/renderer';
import Invoice from "./Invoice";


function History(){
    const [order,setOrder] = useState([]);
    const {user} = useSelector(state =>({...state}));

    useEffect(()=>{
    loadOrders();
    },[]);

    const loadOrders = async() =>{
     const result = await getOrders(user.token);
     setOrder(result.data);
    }

    const showOrderTable = (product) =>{
        console.log(order,'check123');
        return(
            <table className="table table-bordered">
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
        )

    }

    const showDownLoadLink = (orderItem) =>(
    <PDFDownloadLink
    document={<Invoice order={orderItem}/>}
    fileName="invoice.pdf"
    className="btn btn-block btn-sm btn-outlined-primary"
    >
    Download Invoice
    </PDFDownloadLink>
    )

 const showOrders = () =>{
    return(
        order.map(item =>(
            <div key={item._id} className="m-5 p-3 card">
            <PaymentInfo order={item}/>
            {showOrderTable(item?.products)}
            <div className="row">
                <div className="col">
                 {showDownLoadLink(item)}
                </div>
            </div>
            </div>
        ))
    )
 }   

return(
<div className="container-fluid">
    <div className="row">
        <div className="col-md-2">
         <UserNav/>
        </div>
        <div className="col text-center">
         <h4>{order.length ? "User Purchase Orders" : "No purchase Orders"}</h4>
         {showOrders()}
        </div>

    </div>

</div>
)}

export default History;
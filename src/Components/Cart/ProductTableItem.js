import React from "react";
import ModalImage from 'react-modal-image';
import Laptop from '../../Images/laptop.jpg';
import { Select } from 'antd';
import { addToCart } from '../Store/Slices/CartSlice';
import {isEqual, uniqWith} from 'lodash';
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { CheckCircleOutlined, CloseCircleOutlined, CloseOutlined } from "@ant-design/icons";

function ProductTableItem({product}){
    const {cart} = useSelector(state => ({...state}));
    const dispatch = useDispatch();

 const handleColorChange = value =>{
    // console.log(check,value)
    // console.log(e,'checkevent');
    console.log(window,window.localStorage.getItem('cart'))
    let cart =[]
    if(window.localStorage.getItem('cart')){
      cart = JSON.parse(window.localStorage.getItem('cart'));
    }
    console.log(cart);
    // cart.push({
    //   ...productDetails,
    //   count:1
    // });
    cart.forEach(item =>{
        if(item._id === product._id){
            item.color = value;
        }
    });
    const unique = uniqWith(cart,isEqual);
    console.log(unique);
    window.localStorage.setItem('cart',JSON.stringify(unique));
    dispatch(addToCart({cart:unique}));
 }   

 const handleQuantityChange = (e) =>{
    let cart =[]
    if(e.target.value > product.quantity){
       toast.error(`Max Quantity Available : ${product.quantity}`,{
        position:toast.POSITION.TOP_RIGHT
       })
       return;
    }
    if(window.localStorage.getItem('cart')){
      cart = JSON.parse(window.localStorage.getItem('cart'));
    }
    console.log(cart);
    // cart.push({
    //   ...productDetails,
    //   count:1
    // });
    cart.forEach(item =>{
        if(item._id === product._id){
            item.count = e.target.value <1 ? 1 : e.target.value;
        }
    });
    const unique = uniqWith(cart,isEqual);
    console.log(unique);
    window.localStorage.setItem('cart',JSON.stringify(unique));
    dispatch(addToCart({cart:unique}));
 }

 const handleRemove = () =>{
    let cart =[];
    let index='';
    if(window.localStorage.getItem('cart')){
      cart = JSON.parse(window.localStorage.getItem('cart'));
    }
    cart.forEach((item,i) =>{
        if(item._id === product._id){
            cart.splice(i,1);
        }
    });
    const unique = uniqWith(cart,isEqual);
    console.log(unique);
    window.localStorage.setItem('cart',JSON.stringify(unique));
    dispatch(addToCart({cart:unique}));
 }

  
return(
    
    <tr className="text-center">
        <td style={{width:'150px',height:'auto'}}>
            <div>
            <ModalImage
            small={product.images.length ? product.images[0].url:Laptop}
            large={product.images.length ? product.images[0].url:Laptop}
        // alt="Hello World!"
            />
            </div>
        </td>
        <td>{product.title}</td>
        <td>${product.price}</td>
        <td>{product.brand}</td>
        <td>
       <Select
    //    defaultValue={product.color}
       value={product.color}
      style={{
        width: 120,
      }}
      onChange={handleColorChange}
      options={[
        {
          value: 'Black',
          label: 'Black',
        },
        {
          value: 'Brown',
          label: 'Brown',
        },
        {
          value: 'Silver',
          label: 'Silver',
        },
        {
          value: 'White',
          label: 'White',
        },
        {
          value: 'Blue',
          label: 'Blue',
          }
      ].filter(ele => ele.value !== product.color)}/>
    </td>
        <td>
            <input
            type="number"
            className="form-control"
            value={product.count}
            onChange={handleQuantityChange}
            // max={product.quantity}
            />
        </td>
        <td>
        {product.shipping ? <CheckCircleOutlined className="text-success"/> : <CloseCircleOutlined className="text-danger"/>}
        </td>
        <td>
            <CloseOutlined
            onClick={handleRemove}
            className="text-danger"
            style={{cursor:'pointer'}}
            />
        </td>
    </tr>
)
}

export default ProductTableItem;
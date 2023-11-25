import React from 'react';
import {Card,Popconfirm,Skeleton } from 'antd';
import {Link} from 'react-router-dom';
import { ShoppingCartOutlined,EyeOutlined} from '@ant-design/icons';
import Laptop from '../../Images/laptop.jpg';
import {isEqual, uniqWith} from 'lodash';
import { useDispatch } from 'react-redux';
import { addToCart } from '../Store/Slices/CartSlice';
import { handleDrawer } from '../Store/Slices/DrawerSlice';
const { Meta } = Card;

function ProductCard({product,loading}){
  const dispatch = useDispatch();
  const handleAddtoCart = () =>{
    console.log(window,window.localStorage.getItem('cart'))
    let cart =[]
    if(window.localStorage.getItem('cart')){
      cart = JSON.parse(window.localStorage.getItem('cart'));
    }
    cart.push({
      ...product,
      count:1
    });
    const unique = uniqWith(cart,isEqual);
    console.log(unique);
    window.localStorage.setItem('cart',JSON.stringify(unique));
    dispatch(addToCart({cart:unique}));
    dispatch(handleDrawer(true));
  }
    return(
        <Card
        // hoverable
        cover={<img alt="example" src={product.images.length? product.images[0].url:Laptop} style={{ height:'150px',objectFit:'cover',padding:"5px"}}/>}
        actions={[
        // <Popconfirm
        //     title="Are you sure to delete this Product?"
        //     // onConfirm={()=>handleRemove(product.slug)}
        //     // onCancel={cancel}
        //     okText="Yes"
        //     cancelText="No"
        //     // loading={loading}
        //   >
        <>
        {/* <Link onClick={() => console.log('hello')}> */}
         {
          product.quantity > 0 ? <a onClick={handleAddtoCart}>
          <ShoppingCartOutlined /><br/>
          Add to Cart
          </a>:
          <>
          <ShoppingCartOutlined className="text-danger" disabled={true}/><br/>
          Out Of Stock
          </>
         }
        </>,
            <Link to={`/product/${product.slug}`}>
            <EyeOutlined />
            <br/>
            View Product
            </Link>
            // 
        ]}
        className='m-2'
      >
        <Meta title={product.title} description={`${product.description.substring(0,40)}....`} />
      </Card>
    )

}

export default ProductCard;
import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import {Card as CardElement,Popconfirm,Skeleton } from 'antd';
import Card from "../../ProductCard/Card";
import { allProduct, getProduct,create_update_Rating,relatedProduct } from "../../Functions/Product";
import ProductListItem from "./ProductListItem";
import { ShoppingCartOutlined,HeartOutlined,StarOutlined} from '@ant-design/icons';
import { useSelector,useDispatch } from "react-redux";
import StarRatings from 'react-star-ratings';
import RatingsModal from "./RatingsModal";
import {useHistory, Link } from "react-router-dom";
import Laptop from '../../../Images/laptop.jpg';
import { addToCart } from '../../Store/Slices/CartSlice';
import {isEqual, uniqWith} from 'lodash';
import { handleDrawer } from '../../Store/Slices/DrawerSlice';
// import { captureRejectionSymbol } from "events";
const { Meta } = CardElement;

function ViewProduct({match}){
const {slugs} = match.params;
const history = useHistory(); 
const [productDetails,setProductDetails] = useState([]);
const [modal,setModal] =useState(false);
const [filteredProduct,setFilteredProduct] = useState([]);
const [loading,setLoading] = useState(false);
const {user} = useSelector(state => state);

const dispatch = useDispatch();

useEffect(()=>{
   getDetails(true);
},[]);

const handleAddtoCart = () =>{
  console.log(window,window.localStorage.getItem('cart'))
  let cart =[]
  if(window.localStorage.getItem('cart')){
    cart = JSON.parse(window.localStorage.getItem('cart'));
  }
  console.log(cart);
  cart.push({
    ...productDetails,
    count:1
  });
  const unique = uniqWith(cart,isEqual);
  console.log(unique);
  window.localStorage.setItem('cart',JSON.stringify(unique));
  dispatch(addToCart({cart:unique}));
  dispatch(handleDrawer(true));
}

const getDetails = async(check) =>{
  setLoading(true);
  try{
    const response =  await getProduct(slugs);
  if(check){
    const relatedResponse = await relatedProduct(response.data[0]._id);
    console.log(relatedResponse,'zxcv');
    setFilteredProduct(relatedResponse.data);
  }
  setProductDetails(response.data[0]);
  }catch(error){
    console.log(error);
  }finally{
    setLoading(false);
  }
}

console.log(productDetails.images?.length, productDetails);
return(
    <div className="container-fluid">
     <div className="row">
        <div className="col-md-7 p-5">
        <Carousel
        showArrows
        autoPlay
        infiniteLoop
        >
            {
              productDetails.images?.length ? productDetails.images.map(image =>(
                <div>
                    <img src={image.url} />
                </div>
        ))
          :
          <div>
          <img src={Laptop} />
          </div> }
         </Carousel>

        </div>
        <div className="col-md-5 p-5">
        <h1 className="bg-info text-center p-3">{productDetails.title}</h1>
        <div className="text-center p-2">
          {productDetails.ratings?.length ?(
            <>
          <StarRatings
          rating={
            (productDetails.ratings.reduce((n, {star}) => n + star, 0))/productDetails.ratings.length
          }
          starRatedColor="gold"
          // changeRating={this.changeRating}
          numberOfStars={5}
          name='rating'
          starDimension="20px"
          starSpacing="5px"
          isSelectable={true}
          // style={{width:'100%',textAlign:'center'}}
        /><span>
          {`(${productDetails.ratings.length})`}
        </span>
        </>
          ):'No Rating Present'
          }
        </div>
        <CardElement
        // hoverable
        actions={[
          <>
          {
            productDetails.quantity > 0 ? <a onClick={handleAddtoCart}>
            <ShoppingCartOutlined /><br/>
            Add to Cart
            </a>:
            <>
            <ShoppingCartOutlined className="text-danger" disabled={true}/><br/>
            Out Of Stock
            </>
           }
           </>,
            <>
            <HeartOutlined />
            <br/>
           Add to Wishlist
           </>,
           <>
           {user.token ? 
           (<div onClick={()=>setModal(true)}>
           <StarOutlined />
           <br/>
           Add Rating
           </div>
           )
            : (
              <div onClick={()=>history.push({pathname:'/login',state:{from:`/product/${slugs}`}})}>
           {/* <Link to='/login'> */}
           <StarOutlined/>
           <br/>
           Login To Add rating
           {/* </Link> */}
           </div>
           )
        }
        </>
            // 
        ]}
        // className='m-2'
      >
        {/* <Meta title={product.title} description={`${product.description.substring(0,40)}....`} /> */}
        <ProductListItem product={productDetails}/>
      </CardElement>
        </div>
     </div>
     <div className="row p-5">
      {/* <div className="text-center col"> */}
        {/* <hr/> */}
        <h1 className="text-center jumbotron display-4 p-3 w-100">Related Product</h1>
        {filteredProduct.length ? filteredProduct.map(product =>(
          <div className="col-md-4">
         <Card product={product} loading={loading} />
         </div>
      )):<h1 className="text-cente display-4 p-3">No product Found</h1>
        }
      {/* {filteredProduct.map(product =>(
<Card product={product} loading={loading} />
      ))
     }  */}
      {/* <hr/> */}
      {/* </div> */}
     </div>
     {modal ? <RatingsModal isModalOpen={modal} setModal={setModal} data={productDetails} getDetails={getDetails}/>:null}
    </div>
)
}

export default ViewProduct;
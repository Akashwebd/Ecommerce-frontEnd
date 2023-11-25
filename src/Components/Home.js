import React, { useEffect, useState } from "react";
import Typewriter from 'typewriter-effect';
import { allProduct,deleteProduct } from "../Components/Functions/Product";
import { useSelector } from "react-redux";
import Card from "./ProductCard/Card";
import Skeleton from "./ProductCard/Skeleton";
import NewArrival from "./Home/NewArrival";
import BestSeller from "./Home/BestSeller";
import { getCategories } from "./Functions/Category";
import { getSubs } from "./Functions/Sub"; 
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import CategoryList from "./Admin/Product/Categories/CategoryList";
import SubCategoryList from "./Admin/Product/SubCategories/SubCategoryList";

function Home(){
const [list,setList] = useState([]);
const [subsList,setSubsList] = useState([]);
const [loading,setLoading] = useState(false);

useEffect(() =>{
    getCategoriesList();
},[])

const getCategoriesList = async() =>{
try{
    setLoading(true);
    const response = await Promise.all([getCategories(),getSubs()]);
    setList(response[0].data);
    setSubsList(response[1].data);
}catch(error){
console.log(error);
}finally{
    setLoading(false);
}
}

return(
    <>
    <div className='jumbotron text-danger h1 text-center font-weight-bold'>
    <Typewriter
    options={{
    strings: ['Best Seller', 'Latest Product'],
    autoStart: true,
    loop: true,
}}
/>
</div>
    
    <h4 className="jumbotron text-center display-4 mb-5 mt-5 p-3 font-weight-bold">New Arrivals</h4>
    <NewArrival/>
    <h4 className="jumbotron text-center display-4 mb-5 mt-5 p-3 font-weight-bold">Best Sellers</h4>
    <BestSeller/>
    {loading ? 
    (
    <div className='h1 text-center font-weight-bold'>
    <Spin indicator={
    <LoadingOutlined style={{ fontSize: 60,paddingTop:'10px' }} spin />
     }  
     size="large"
     />
     </div>
     ):
     <>
     <h4 className="jumbotron text-center display-4 mb-5 mt-5 p-3 font-weight-bold">Categories</h4>
     <CategoryList list={list}/>
     <h4 className="jumbotron text-center display-4 mb-5 mt-5 p-3 font-weight-bold">Sub Categories</h4>
     <SubCategoryList list={subsList}/>
     </>
     }
    </>
)
}

export default Home;
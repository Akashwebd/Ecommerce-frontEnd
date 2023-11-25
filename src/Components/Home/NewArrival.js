import React,{useEffect,useState} from "react";
import {fetchCertainProduct,productCount } from "../../Components/Functions/Product";
import Skeleton from "../ProductCard/Skeleton";
import Card from "../ProductCard/Card";
import { Pagination } from 'antd';
import StarRatings from 'react-star-ratings';

function NewArrival(){
    const [list,setList] = useState([]);
    const [loading,setLoading] = useState(false);
    const [page,setPage] = useState(1);
    const [count,setCount] = useState(0);

    useEffect(()=>{
        getList();
    },[page]);

    useEffect(()=>{
     (async()=>{
        const response = await productCount();
        setCount(response.data);
     })();
    },[]);
    
    const getList = async() =>{
        console.log('hello')
        setLoading(true);
        try{
            const productList = await fetchCertainProduct('createdAt','desc',page);
            setList(productList.data);
        }catch(error){
            console.log(error);
        }finally{
            setLoading(false);
        }
    }
    console.log(count);
return (
    <>
    <div className="container">
    <div className="row">
    {
       loading ? <Skeleton loading={loading} count={3}/> :
       list.map(product =>(
        <div className="col-md-4" key={product._id}>
            <div className="text-center p-2">
        <StarRatings
          rating={product?.ratings.length ?
            (product.ratings.reduce((n, {star}) => n + star, 0))/product.ratings.length:
            0
          }
        // rating={4}
          starRatedColor="gold"
          // changeRating={this.changeRating}
          numberOfStars={5}
          name='rating'
          starDimension="20px"
          starSpacing="5px"
          isSelectable={true}
          // style={{width:'100%',textAlign:'center'}}
        />
        </div>
         <Card product={product} loading={loading} />
        </div>
            
        ))
    }
    </div>
    <Pagination className="text-center mt-2 p-5"  current={page} total={Math.ceil(count/3)*10} onChange={(value)=>setPage(value)}/>
</div>
</>
);
}
export default NewArrival;
import React, { useState,useEffect} from "react";
import { getCategory } from "../../../Functions/Category";
import { Spin } from 'antd';
import Card from "../../../ProductCard/Card";

function ViewCategoryProduct({match}){
    const [category,setCategory] = useState({});
    const [products,setProducts] = useState([]);
    const [loading,setLoading] = useState(false);
    const {slugs} = match.params;

    useEffect(() => {
        getListData();
    },[]);

    const getListData = async() =>{
        setLoading(true);
        try{
            const response  = await getCategory(slugs);
            setCategory(response.data.category);
            setProducts(response.data.products); 
        }catch(error){
            console.log(error);
        }finally{
            setLoading(false);
        }
    }

    console.log(category,products);
return(
    <>
    <h4 className="jumbotron text-center display-4 mb-5 mt-5 p-3 font-weight-italic"><span className="font-weight-bold">{products.length}</span> Products in <span className="font-weight-bold">{category.name}</span> Category </h4>
    <div className="container">
        <div className='row'>
                { products.map(product =>(
                    <div className="col-md-4">
                    <Card product={product} loading={loading} />
                    </div>
                ))
}
        </div>

    </div>
    </>
)
}

export default ViewCategoryProduct;
import React,{useEffect, useState} from "react";
import { allProduct,productByFilter } from "../../../Functions/Product";
import Card from "../../../ProductCard/Card";
import { useSelector,useDispatch} from "react-redux";
// import { productByFilter } from "../../../Functions/Product";
import { getCategories } from "../../../Functions/Category";
import { setText } from "../../../Store/Slices/TextSlice";
import {Checkbox, Menu,Slider,Radio} from 'antd';
import { DollarOutlined, DownSquareOutlined, StarOutlined } from "@ant-design/icons";
import Rating from "../Ratings";
import { getSubs } from "../../../Functions/Sub";
import PageLoader from "../../../PageLoader";
const {SubMenu,ItemGroup} = Menu;

const brands = ["Apple","Microsoft","Lenovo","Samsung","Asus"];
const colors = ['Black','Brown','Silver','White','Blue'];

function Shop({match}){
const [list,setList] = useState([]);
const [loading,setLoading] = useState(false);
const [categories,setCategories]= useState([]);
const [selectedCat,setSelectedCat] = useState([]);
const [subs,setSubs] = useState([]);
const [price,setPrice] = useState([0,0]);
const [ok,setOk] = useState(false);
const filterText = useSelector(state=>state.filterText);
const {searchword} = match.params;
const [brand,setBrand] = useState('');
const [color,setColor] = useState('');
const [shipping,setShipping] = useState('');
const dispatch = useDispatch();

useEffect(()=>{
getProducts();
},[]);

const getProducts = async() =>{
    setLoading(true);
try{
    const response = await Promise.all([
        getCategories(),
        searchword?getFilteredProducts({query:filterText.text}) :allProduct(12),
        getSubs()
    ]);
    console.log(response,'checkresponse',response[0].data);
    setCategories(response[0].data);
    setList(response[1].data);
    setSubs(response[2].data);
}catch(error){
    console.log(error);
}finally{
    setLoading(false);
}
}

const getFilteredProducts  = async(query) =>{
    try{
        const response =await productByFilter(query); 
        console.log(response,'checkresponse');
        setList(response.data);
    }catch(error){
        console.log(error);
    }
}

useEffect(()=>{
    if(!filterText.text) return;
        const interval = setTimeout(()=>{
            getFilteredProducts({query:filterText.text});
          },300);

    return () => clearTimeout(interval);
    
},[filterText]);

useEffect(()=>{
getFilteredProducts({price});
},[ok])

const handlePriceChange = (value) =>{
    if(filterText.text){
        dispatch(setText({text:''}))
    }
    if(brand){
        setBrand('');
    }if(color){
        setColor('');
    }
    if(shipping){
        setShipping('');
    }
    setPrice(value);
setTimeout(()=>{
    setOk(!ok);
},300)
}

const handleChangeCategory = (e) =>{
    // dispatch(setText({text:''}))
    if(JSON.stringify(price) !== JSON.stringify([0,0])){
        setPrice([0,0]);
    }
    if(filterText.text){
        dispatch(setText({text:''}))
    }
    if(brand){
        setBrand('');
    }if(color){
        setColor('');
    }
    if(shipping){
        setShipping('');
    }
    const categoryList = [...selectedCat];
    const value = e.target.value;
    if(categoryList.indexOf(value) === -1){
        categoryList.push(value);
    }else{
        categoryList.splice(categoryList.indexOf(value),1);
    }
    console.log(categoryList);
    setSelectedCat(categoryList);
    getFilteredProducts({category:categoryList})
}

const handleStar = (value) =>{
    if(JSON.stringify(price) !== JSON.stringify([0,0])){
        setPrice([0,0]);
    }
    if(filterText.text){
        dispatch(setText({text:''}))
    }
    if(JSON.stringify(selectedCat) !== JSON.stringify([])){
        setSelectedCat([]);
    }
    if(brand){
        setBrand('');
    }if(color){
        setColor('');
    }
    if(shipping){
        setShipping('');
    }
   getFilteredProducts({stars:value});
}

const handleSubs = (value) =>{
    if(JSON.stringify(price) !== JSON.stringify([0,0])){
        setPrice([0,0]);
    }
    if(filterText.text){
        dispatch(setText({text:''}))
    }
    if(JSON.stringify(selectedCat) !== JSON.stringify([])){
        setSelectedCat([]);
    }
    if(brand){
        setBrand('');
    }if(color){
        setColor('');
    }
    if(shipping){
        setShipping('');
    }
    getFilteredProducts({sub:value});
}

const showSubCategory = () =>(
    subs.map(item =>(
        <div className="p-1 m-1 badge badge-secondary" key={item._id} style={{cursor:"pointer"}} onClick={() => handleSubs(item._id)}>
          {item.name}
        </div>
    ))
)

const handleChange = (event) =>{
    if(JSON.stringify(price) !== JSON.stringify([0,0])){
        setPrice([0,0]);
    }
    if(filterText.text){
        dispatch(setText({text:''}))
    }
    if(JSON.stringify(selectedCat) !== JSON.stringify([])){
        setSelectedCat([]);
    }
    if(color){
        setColor('')
    }
    if(shipping){
        setShipping('');
    }
setBrand(event.target.value);
getFilteredProducts({brand:event.target.value});
}

const showBrands = () =>(
    brands.map( item =>(
            <Radio
            value={item}
            name={item}
            checked = {item === brand}
            className='pl-1 pb-1 pt-2 pr-4'
            onChange={handleChange}
            >
              {item}
            </Radio>
        )
    )
)

const handleColorChange = (event) =>{
    if(JSON.stringify(price) !== JSON.stringify([0,0])){
        setPrice([0,0]);
    }
    if(filterText.text){
        dispatch(setText({text:''}))
    }
    if(JSON.stringify(selectedCat) !== JSON.stringify([])){
        setSelectedCat([]);
    }
    if(brand){
        setBrand('');
    }
    if(shipping){
        setShipping('');
    }
    setColor(event.target.value);
    getFilteredProducts({color:event.target.value});
    }

const showColor = () =>(
    colors.map( item =>(
            <Radio
            value={item}
            name={item}
            checked = {item === color}
            className='pl-1 pb-1 pt-2 pr-4'
            onChange={handleColorChange}
            >
              {item}
            </Radio>
        )
    )
)

const handleShippingChange = (e) =>{
    if(JSON.stringify(price) !== JSON.stringify([0,0])){
        setPrice([0,0]);
    }
    if(filterText.text){
        dispatch(setText({text:''}))
    }
    if(JSON.stringify(selectedCat) !== JSON.stringify([])){
        setSelectedCat([]);
    }
    if(brand){
        setBrand('');
    }if(color){
        setColor('');
    }
setShipping(e.target.value);
getFilteredProducts({shipping:e.target.value});
}

const showShipping = () =>(
    <>
    <div>
    <Checkbox 
    checked={shipping === "Yes"} 
    className="pb-2 pl-4 pr-4" 
    value="Yes"
    // name="category" 
    onChange={handleShippingChange}>
       Yes
  </Checkbox>
    </div>
    <div>
    <Checkbox 
  checked={shipping === "No"} 
  className="pb-2 pl-4 pr-4" 
  value="No"
  // name="category" 
  onChange={handleShippingChange}>
     No
</Checkbox>     
    </div>
</>
)


console.log(selectedCat,'check123');
return(
    <div className="container-fluid">
        <div className="row">
            <div className="col-md-2 pt-2">
             <h4 className="text-center">Search Filter</h4>
             <hr/>
             <Menu mode="inline" defaultOpenKeys={['1','2','3','4','5','6','7','8','9']}>
                <SubMenu 
                key="1" 
                title={<span className="h6">
                 <DollarOutlined className="p-1"/>Price
                </span>}
                >
                    <Slider
                    className="ml-4 mr-4"
                    tipFormatter={v=>`$${v}`}
                    range
                    value={price}
                    onChange={handlePriceChange}
                    max={4999}
                    
                    />
                </SubMenu>
                <SubMenu 
                key="2" 
                title={<span className="h6">
                 <DownSquareOutlined className="p-1"/>Categories
                </span>}
                >
                    {console.log(categories,'checkcat')}
                    {
                        categories.map(cat =>(
                            <div key={cat._id}>
                                <Checkbox checked={selectedCat.includes(cat._id)} className="pb-2 pl-4 pr-4" value={cat._id} name="category" onChange={handleChangeCategory}>
                                  {cat.name}
                                </Checkbox>

                            </div>
                        ))
                    }
                    {/* <Slider
                    className="ml-4 mr-4"
                    tipFormatter={v=>`$${v}`}
                    range
                    value={price}
                    onChange={handlePriceChange}
                    max={4999}
                    
                    /> */}
                </SubMenu>
                <SubMenu
                 key="3" 
                 title={<span className="h6">
                  <StarOutlined className="p-1"/>Rating
                 </span>}
                >
                <div className="pr-4 pl-4 pb-2">
                 <Rating numberOfStars={5} starClick={handleStar}/>
                 <br/>
                 <Rating numberOfStars={4} starClick={handleStar}/>
                 <br/>
                 <Rating numberOfStars={3} starClick={handleStar}/>
                 <br/>
                 <Rating numberOfStars={2} starClick={handleStar}/>
                 <br/>
                 <Rating numberOfStars={1} starClick={handleStar}/>
                 </div>
                </SubMenu>
                <SubMenu
                key='6'
                title={<span className="h6">
                <DownSquareOutlined className="p-1"/>Sub Category
               </span>}
                >
                {showSubCategory()}
                </SubMenu>
                <SubMenu
                 key='7'
                 title={<span className="h6">
                 <DownSquareOutlined className="p-1"/>Brands
                </span>}
                >
                    <div style={{marginTop:"-10px"}} className="pl-4 pr-4">
                     {showBrands()}
                    </div>

                </SubMenu>
                <SubMenu
                 key='8'
                 title={<span className="h6">
                 <DownSquareOutlined className="p-1"/>Colors
                </span>}
                >
                    <div style={{marginTop:"-10px"}} className="pl-4 pr-4">
                     {showColor()}
                    </div>

                </SubMenu>
                <SubMenu
                 key='9'
                 title={<span className="h6">
                 <DownSquareOutlined className="p-1"/>Shipping
                </span>}
                >
                    <div style={{marginTop:"-10px"}} className="pl-1 pt-2 pr-4">
                     {showShipping()}
                    </div>

                </SubMenu>
             </Menu>
            </div>
            <div className="col-md-9 p-2">
                <h1 className="jumbotron text-center display-4 p-2">Product</h1>
             <div className="row">
             {loading ? <PageLoader/>:
             (
                list.map(product =>(
               <div className="col-md-3">
               <Card product={product} loading={loading} />
               </div>
                ))
             )}
             </div>
            </div>

        </div>

    </div>
)
}

export default Shop;
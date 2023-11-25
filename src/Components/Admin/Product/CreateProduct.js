import React,{useState,useEffect} from "react";
import AdminNav from "../Nav/AdminNav";
import { DeleteOutlined,EditOutlined,LoginOutlined} from '@ant-design/icons';
import { Button,Select,Avatar, Badge } from "antd";
import {createProduct,getSub} from '../../Functions/Product';
import {toast } from 'react-toastify';
import { UseSelector, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SearchFilter from "../../SearchFilter";
import {getCategories} from '../../Functions/Category';
import ImageUpload from "../../ImageUpload/ImageUpload";
const Option = Select;

const initialState ={
  title:'Mackbook Pro',
  description:'Macbook from Apple',
  price:'4000',
  quantity:'100',
  category:'',
  allCategory:[],
  subs:[],
  allSubs:[],
  shipping:'Yes',
  colors:['Black','Brown','Silver','White','Blue'],
  brands:["Apple","Microsoft","Lenovo","Samsung","Asus"],
  color:'White',
  brand:'Apple',
  images:[]
  // sold:0,
}

function CreateProduct(){
  const [value,setValue] = useState(initialState);
  const {title,description,price,quantity,category,subs,shipping,colors,brands,color,brand,images,allCategory,allSubs} = value;

  const {user} = useSelector(state => state);

useEffect(()=>{
    (async()=>{
      const res = await getCategories();
      setValue({...value,allCategory:res.data});
    })();
    },[]);  

const handleChange = async(e) =>{
  e.preventDefault();
  const value = e.target.value;
//   const value = e.target.value;
 if(e.target.name === 'category'){
  const subCategories = await getSub(e.target.value);
  console.log(subCategories,'countCheck');
  setValue(prevValues => {
    return {...prevValues,[e.target.name]:value,allSubs:subCategories.data,subs:[]}
  });
  // setValue({...value,allSubs:value,category:value});
  console.log('countCheck');
 }else{
  setValue(prevValues => {
    return {...prevValues,[e.target.name]:e.target.value,}
  });
 }
}

const handleProductSubmit = async() =>{
  try{
   const res =  await createProduct(value,user.token);
    console.log('done');
    // toast.success('Product Created Successfully',{
    //   position:toast.POSITION.TOP_RIGHT
    // });
    window.alert(`${res.data.title} is created`);
    window.location.reload();
  }catch(error){
    console.log(error,'checkerror');
    toast.error(error.response.data.err,{
      position:toast.POSITION.TOP_RIGHT
    })
  }

}

const createProductForm = () => 
    <>
    <h4>Create Product</h4>
    <form>
      <div className="form-group">
        <label>Title</label>
      <input type='text' className="form-control" name='title' value={title} onChange={handleChange} placeholder="Enter Title"/>
      </div>
      <div className="form-group">
      <label>Description</label>
      <input type='text' className="form-control" name='description' value={description} onChange={handleChange} placeholder="Enter Description"/>
      </div>
      <div className="form-group">
      <label>Price</label>
      <input type='number' className="form-control" name='price' value={price} onChange={handleChange} placeholder="Enter Price"/>
      </div>
      <div className="form-group">
      <label>Quantity</label>
      <input type='number' className="form-control" name='quantity' value={quantity} onChange={handleChange} placeholder="Enter Quantity"/>
      </div>
      <div className="form-group">
      <label>Shipping</label>
      <select name='shipping' className="form-control" value={shipping} onChange={handleChange}>
            <option>Select Shipping</option>
              
                        <option value="Yes" >Yes</option>
                        <option value="No">No</option>
                    
                {/* <option>option1</option>
                <option>option2</option> */}
      </select>
      </div>
      <div className="form-group">
      <label>Color</label>
      <select name='color' className="form-control" value={color} onChange={handleChange}>
            <option>Select Color</option>
                {
                    ['Black','Brown','Silver','White','Blue'].map(element =>(
                        <option value={element} key={element}>{element}</option>
                    ))
                }
                {/* <option>option1</option>
                <option>option2</option> */}
      </select>
      </div>
      <div className="form-group">
      <label>Brand</label>
      {/* <input type='text' className="form-control" name='brand' value={brand} onChange={handleChange} placeholder="Enter Brand"/> */}
      <select name='brand' className="form-control" value={brand} onChange={handleChange}>
            <option>Select Brand</option>
                {
                    ["Apple","Microsoft","Lenovo","Samsung","Asus"].map(element =>(
                        <option value={element} key={element}>{element}</option>
                    ))
                }
                {/* <option>option1</option>
                <option>option2</option> */}
      </select>
      </div>
      <div className="form-group">
      <label>Category</label>
      {/* <input type='text' className="form-control" name='brand' value={brand} onChange={handleChange} placeholder="Enter Brand"/> */}
      <select name='category' className="form-control" value={category} onChange={handleChange}>
            <option>Select Category</option>
                {   
                allCategory.map(element =>(
                        <option value={element._id} key={element._id}>{element.name}</option>
                    ))
                }
                {/* <option>option1</option>
                <option>option2</option> */}
      </select>
      </div>
      {category && allSubs.length?(<div className="form-group">
      <label>SubCategory</label>
      {/* <input type='text' className="form-control" name='brand' value={brand} onChange={handleChange} placeholder="Enter Brand"/> */}
      <Select
      mode="multiple"
      className="form-control"
      // disabled
      style={{ width: '100%' }}
      placeholder="Please select"
      // defaultValue={subs}
      onChange={(values) => setValue({...value,subs:values})}
      // options={allSubs.map(element => element._id)}
      value={subs}
    >
      {allSubs.map(sub =>(
        <Option value={sub._id}>
        {sub.name}
        </Option>
      ))}
    </Select>
      </div>):null}
      <div className="p-3">
       <ImageUpload
       value={value}
       setValue={setValue}
       />
      </div>
      {/* <div className="form-group">
        <label>
        <input ty hidden/>
        </label>
      </div> */}
      <Button 
        type="primary" 
        shape="round" 
        // icon={<LoginOutlined />} 
        // block
        // disabled={loading}
        onClick={handleProductSubmit}
        className="mb-3 mt-3"
        size='large'>
        Save
      </Button>
    </form>    
    </>




console.log(value,'checkvalue');

return(
    <div className="container-fluid">
    <div className="row">
        <div className="col-md-2">
         <AdminNav/>
        </div>
        <div className="col-md-10 mt-3">
          {createProductForm()}
        </div>

    </div>

    </div>
)

}

export default CreateProduct;
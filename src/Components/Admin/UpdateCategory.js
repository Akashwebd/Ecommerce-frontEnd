import React, { useEffect, useState } from "react";
import { Button } from "antd";
import {getCategory, updateCategory} from '../Functions/Category';
import {toast } from 'react-toastify';
import { useSelector } from "react-redux";
import AdminNav from "./Nav/AdminNav";

function UpdateCategory({history,match}){
    const [name,setName] = useState('');
    const [loading,setLoading] = useState(false);
    const {params:{slugs}} = match;
    const {user} = useSelector(state => state);

useEffect(()=>{
  (async () =>{
   const response = await getCategory(slugs);
   setName(response.data.category.name);
  })();
},[])

const handleCategoryUpdateSubmit = async () =>{
    try{
        const updatedCategory = await updateCategory(slugs,{name},user.token);
        toast.success(`Category ${updatedCategory.data.name} updated`,{
            position:toast.POSITION.TOP_RIGHT
        });
        history.push('/admin/category');
    }catch(error){
        toast.success(error.response.data,{
            position:toast.POSITION.TOP_RIGHT
        })
    }
}

const updateCategoryForm = () =>(
    <form>
    <label>Update Category</label>
  <input type='text' className="form-control" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Enter Category"/>
  <Button 
    type="primary" 
    shape="round" 
    // icon={<LoginOutlined />} 
    // block
    disabled={loading}
    onClick={handleCategoryUpdateSubmit}
    className="mb-3 mt-3"
    size='large'>
    Submit
  </Button>
</form> 
)


return (
    <div className="container-fluid">
    <div className="row">
        <div className="col-md-2">
         <AdminNav/>
        </div>
        <div className="col-md-6 offset-md-2 mt-3">
            {updateCategoryForm()}
         </div>
    </div>
    </div>        
)


}

export default UpdateCategory;
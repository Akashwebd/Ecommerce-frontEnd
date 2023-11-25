import React,{useState,useEffect} from "react";
import AdminNav from "./Nav/AdminNav";
import { DeleteOutlined,EditOutlined,LoginOutlined} from '@ant-design/icons';
import { Button } from "antd";
import {createCategory,getCategories,deleteCategory} from '../Functions/Category';
import {toast } from 'react-toastify';
import { UseSelector, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SearchFilter from "../SearchFilter";

function Category(){
     const [name,setName] = useState('');   
     const [loading,setLoading] = useState(false);
     const [categoryList,setCategoryList] = useState([]);
     const {user} = useSelector(state => state);
     const [keyword,setKeyword] = useState('');

 useEffect(()=>{
 getList();
 },[])    


const handleCategorySubmit = async () => {
try{
    setLoading(true);
    await createCategory({name},user.token);
    toast.success('Category Updated Successfully',{
        position: toast.POSITION.TOP_RIGHT
    });
    getList();
}catch(error){
    console.log(error.response)
    toast.error(error.response.data,{
        position: toast.POSITION.TOP_RIGHT
    });
    getList();
}finally{
    setLoading(false);
}
}

const getList = async() => {
    const res = await getCategories();
    console.log(res,'zxcv');
    setCategoryList(res.data);
}

const addCareForm = () => 
    <form>
        <label>Category</label>
      <input type='text' className="form-control" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Enter Category"/>
      <Button 
        type="primary" 
        shape="round" 
        // icon={<LoginOutlined />} 
        // block
        disabled={loading}
        onClick={handleCategorySubmit}
        className="mb-3 mt-3"
        size='large'>
        Submit
      </Button>
    </form>    

const handleDeleteCategory = async(name) =>{
try{
    const category = await deleteCategory(name,user.token);
    console.log(category);
    toast.success(` Category ${category.data.slug} deleted Successfully`,{
        position: toast.POSITION.TOP_RIGHT
    })
    getList();
}catch(error){
console.log(error);
toast.error(error.response.data,{
    position:toast.POSITION.TOP_RIGHT
})
}
}

const searched = keyword => c => c.name.toLowerCase().includes(keyword)


console.log(categoryList,'check list');
return(
    <div className="container-fluid">
    <div className="row">
        <div className="col-md-2">
         <AdminNav/>
        </div>
        <div className="col-md-6 offset-md-2 mt-3">
            {addCareForm()}
            <SearchFilter keyword={keyword} setKeyword={setKeyword}/>
            {/* <hr/> */}
            {
                categoryList.filter(searched(keyword)).map((c) => (
                    <div className="alert alert-secondary" key={c._id}>
                    {c.name}
                    <span className="btn btn-sm float-right">
                    <DeleteOutlined onClick={()=>handleDeleteCategory(c.slug)}/>
                    </span>
                    <Link to={`/admin/category/${c.slug}`} >
                    <span className="btn btn-sm float-right">
                    <EditOutlined />
                    </span>
                    </Link>
                    </div>

                ))
            }
        </div>

    </div>

    </div>
)

}

export default Category;
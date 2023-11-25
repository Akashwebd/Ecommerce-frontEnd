import React,{useState,useEffect} from "react";
import AdminNav from "./Nav/AdminNav";
import { DeleteOutlined,EditOutlined,LoginOutlined} from '@ant-design/icons';
import { Button } from "antd";
import {createSub,getSubs,deleteSub} from '../Functions/Sub';
import {getCategories} from '../Functions/Category';
import {toast } from 'react-toastify';
import { UseSelector, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SearchFilter from "../SearchFilter";

function Sub(){
     const [name,setName] = useState('');   
     const [loading,setLoading] = useState(false);
     const [categoryName,setCategoryName] = useState('');
     const [categoryList,setCategoryList] = useState([]);
     const [subCategoryList,setSubCategoryList] = useState([]);
     const {user} = useSelector(state => state);
     const [keyword,setKeyword] = useState('');

 useEffect(()=>{
 getList();
 getSubCategories();
 },[])    


const handleSubCategorySubmit = async () => {
try{
    setLoading(true);
    console.log(name,categoryName,'check123');
    await createSub({name,categoryName},user.token);
    toast.success('Sub Category Updated Successfully',{
        position: toast.POSITION.TOP_RIGHT
    });
    getSubCategories();
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
    setCategoryName(res.data[0]._id);

}

const getSubCategories = async() =>{
    const res = await getSubs();
    setSubCategoryList(res.data);
}
// console.log(categoryName,'checkname');
const addCareForm = () => 
    <form>
        <h4>Sub Category</h4>
        <div className="form-group">
            <label>Category</label>
            <select name='category' className="form-control" value={categoryName} onChange={(e)=>{{
                setCategoryName(e.target.value)
            }
            }}>
                {
                    categoryList.map(element =>(
                        <option value={element._id} key={element._id}>{element.name}</option>
                    ))
                }
                {/* <option>option1</option>
                <option>option2</option> */}
            </select>

        </div>
      <input type='text' className="form-control" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Enter Sub Category"/>
      <Button 
        type="primary" 
        shape="round" 
        // icon={<LoginOutlined />} 
        // block
        disabled={loading}
        onClick={handleSubCategorySubmit}
        className="mb-3 mt-3"
        size='large'>
        Submit
      </Button>
    </form>    

const handleDeleteCategory = async(name) =>{
try{
    const category = await deleteSub(name,user.token);
    console.log(category);
    toast.success(`Sub Category ${category.data.slug} deleted Successfully`,{
        position: toast.POSITION.TOP_RIGHT
    })
    getSubCategories();
}catch(error){
console.log(error);
toast.error(error.response.data,{
    position:toast.POSITION.TOP_RIGHT
})
}
}

const searched = keyword => c => c.name.toLowerCase().includes(keyword)


// console.log(categoryList,'check list');
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
                subCategoryList.filter(searched(keyword)).map((c) => (
                    <div className="alert alert-secondary" key={c._id}>
                    {c.name}
                    <span className="btn btn-sm float-right">
                    <DeleteOutlined onClick={()=>handleDeleteCategory(c.slug)}/>
                    </span>
                    <Link to={`/admin/sub/${c.slug}`} >
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

export default Sub;
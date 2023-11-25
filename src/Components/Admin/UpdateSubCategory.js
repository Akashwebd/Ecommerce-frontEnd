import React,{useState,useEffect} from "react";
import AdminNav from "./Nav/AdminNav";
import { DeleteOutlined,EditOutlined,LoginOutlined} from '@ant-design/icons';
import { Button } from "antd";
import {createSub,updateSub,getSub} from '../Functions/Sub';
import {getCategories} from '../Functions/Category';
import {toast } from 'react-toastify';
import { UseSelector, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SearchFilter from "../SearchFilter";

function UpdateSubCategory({history,match}){
     const [name,setName] = useState('');   
     const [loading,setLoading] = useState(false);
     const [categoryName,setCategoryName] = useState('');
     const [categoryList,setCategoryList] = useState([]);
     const {user} = useSelector(state => state);
     const {params:{slugs}} = match;

 useEffect(()=>{
    (async () =>{
    const response = await getSub(slugs);
    setName(response.data.sub.name);
    getList(response.data.sub.parent);
    })();
 },[])    


const handleSubCategorySubmit = async () => {
try{
    setLoading(true);
    console.log(name,categoryName,'check123');
    const updatedCategory = await updateSub(slugs,{name,categoryName},user.token);
    toast.success(`Sub Category  Updated Successfully`,{
        position: toast.POSITION.TOP_RIGHT
    });
    console.log(updatedCategory,'checkupdatedcategory');
    history.push('/admin/sub');
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

const getList = async(id) => {
    const res = await getCategories();
    setCategoryList(res.data);
    console.log(res.data,(res.data.filter(ele => ele._id === id))[0]._id);
    setCategoryName((res.data.filter(ele => ele._id === id))[0]._id);

}
// console.log(categoryName,'checkname');
const addSubForm = () => 
    <form>
        <h4>Update Sub Category</h4>
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


// console.log(categoryList,'check list');
return(
    <div className="container-fluid">
    <div className="row">
        <div className="col-md-2">
         <AdminNav/>
        </div>
        <div className="col-md-6 offset-md-2 mt-3">
            {addSubForm()}
        </div>

    </div>

    </div>
)

}

export default UpdateSubCategory;
import React from "react";
import { SearchOutlined } from "@ant-design/icons";
import { useDispatch,useSelector } from "react-redux";
import { setText } from "../Store/Slices/TextSlice";
import { useHistory } from "react-router-dom";
import { setNavOptions } from "../Store/Slices/HeaderSlice";

function ProductFilter({setCurrent}){
const {filterText:{text},header} = useSelector(state => state);
const dispatch = useDispatch();
const history = useHistory();

const handleSubmit = (e) =>{
    e.preventDefault();
    dispatch(setNavOptions("shop"));
    history.push(`/shop/${text}`);
}

const handleChange = (e) => {
   dispatch(setText({text:e.target.value}))

} 

return(
    <form className="form-inline my-2 my-lg-0 mr-2" onSubmit={handleSubmit}>
        <input type='search' onChange={handleChange} value={text} placeholder="Search" className="form-control mr-sm-2"/>
        <SearchOutlined onClick={handleSubmit} style={{cursor:'pointer'}}/>
    </form>
)
}

export default ProductFilter;
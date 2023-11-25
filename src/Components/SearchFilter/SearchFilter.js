import React from "react";

function SearchFilter({keyword,setKeyword}){
return(
    <input 
    type='search' 
    className="form-control mb-4" 
    value={keyword} 
    onChange={(e)=>setKeyword(e.target.value)} 
    placeholder="Enter to search Category"/>
)
}

export default SearchFilter;
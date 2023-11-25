import React from "react";
import { Link } from "react-router-dom";


function CategoryList({list}){
    console.log(list,'checklist')
return(
    <div className="container p-2">
        <div className="row">
                 {
                    list.length && list.map(element => (
                        <div className="col-md-3">
                            <Link to={`/category/${element.slug}`}>
                        <div className="btn btn-outlined-primary btn-lg btn-block btn-raised m-2">
                        {element.name}
                        </div>
                        </Link>
                        </div>
                    )) 
                 }
        </div>

    </div>
)
}

export default CategoryList;
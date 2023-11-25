import React from "react";
import AdminNav from "./Nav/AdminNav";

function AdminDashboard(){
return(
    <div className="container-fluid">
    <div className="row">
        <div className="col-md-2">
         <AdminNav/>
        </div>
        <div className="col">
            Welcome To AdminDashboard
        </div>

    </div>

</div>
)

}

export default AdminDashboard;
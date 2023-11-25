import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import { UseSelector, useSelector } from "react-redux";
import RedirectCountdown from "./RedirectCountdown";
import {currentAdmin} from '../Functions/auth';



function AdminRoute({...rest}){

    const {user} = useSelector(state => state);
    const [ok,setOk] = useState(false);

    useEffect(()=>{
        if(user?.token){
            currentAdmin(user.token).then((res)=>{
                setOk(true);
             }).catch(error=>console.log(error,'admin error'));
        }
    },[user])
console.log(ok,'admin')
    return (
    ok ? <Route {...rest}/>:<RedirectCountdown/>
    );



}

export default AdminRoute;
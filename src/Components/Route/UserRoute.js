import React from "react";
import { Route } from "react-router-dom";
import { UseSelector, useSelector } from "react-redux";
import RedirectCountdown from "./RedirectCountdown";


function UserRoute({...rest}){

    const {user} = useSelector(state => state);

    return (
    user && user.token  ? <Route {...rest}/>:<RedirectCountdown/>
    );



}

export default UserRoute;
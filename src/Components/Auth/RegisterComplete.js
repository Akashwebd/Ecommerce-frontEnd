import React,{useEffect, useState} from "react";
import { Button } from "antd";
import { auth } from "./Firebase";
import { ToastContainer, toast } from 'react-toastify';
import {createOrUpdateUser} from '../Functions/auth';
import { useDispatch } from "react-redux";
// import { ToastContainer, toast } from 'react-toastify';
import { loggedIn } from "../Store/Slices/UserSlice";
// import 'react-toastify/dist/ReactToastify.css';

function RegisterComplete({history}){

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const dispatch = useDispatch();

    useEffect(()=>{
    setEmail(window.localStorage.getItem('emailForRegistration'));   
    },[]);

    const handleSubmit =async (e) =>{
        try{
            e.preventDefault();
            const result =  await auth.signInWithEmailLink(email,window.location.href);
            console.log(result,'zxcv');
            if(result.user.emailVerified){
                window.localStorage.removeItem('emailForRegistration');
                const user = auth.currentUser;
                console.log(password,'zxcv');
                user.updatePassword(password);
                const token = (await user.getIdTokenResult()).token;
                const res = await createOrUpdateUser(token)
                console.log(res.data,'updateduser');
                dispatch(loggedIn({
                    id:res.data._id,
                    email:res.data.email,
                    name:res.data.name,
                    role:res.data.role,
                    token:token
                }));
                history.push('/');
            }
        }catch(error){
            console.log(error);
        }
        
    }

    const registrationForm = () =>
   <form onSubmit={handleSubmit}>
      <input type='email' className="form-control" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter your email"/>
      <input type='password' className="form-control" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter your password"/>
      <button type='submit' className="btn btn-raised">
        Submit
    </button>
    </form>


return(
    <div className="container p-5">
        <div className="row">
            <div className="col-md-6 offset-md-3">
            <h1>Registration</h1>
            {registrationForm()}
            {/* {<ToastContainer/>} */}
            </div>
        </div>

    </div>
)
}

export default RegisterComplete;
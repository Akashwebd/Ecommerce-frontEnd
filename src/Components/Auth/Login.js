import React,{useEffect, useState} from "react";
import axios from 'axios';
import { Button } from "antd";
import { LoginOutlined,GoogleOutlined } from '@ant-design/icons';
import { auth } from "./Firebase";
import { useDispatch,useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import { loggedIn } from "../Store/Slices/UserSlice";
import { googleAuthProvider } from "./Firebase";
import { Link } from "react-router-dom";
import {createOrUpdateUser} from '../Functions/auth';
import { LoadingOutlined } from "@ant-design/icons";
// import 'react-toastify/dist/ReactToastify.css';

function Login({history}){

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [loading,setLoading] = useState(false);

    const dispatch = useDispatch();
    const {user} = useSelector(state => state.user);

    // useEffect(()=>{
    // setEmail(window.localStorage.getItem('emailForRegistration'));   
    // },[]);
    useEffect(()=>{
        console.log('check2');
        if(history?.location?.state) return;
    if(user && user.token){
        history.push('/');
    }
    },[user,history]);

    const roleBasedRedirect = (res) =>{
        console.log(res,'check1',history);
        let intended = history.location.state;
    if (intended) {
      history.push(intended.from);
    }else{
        if(res.data.role === 'admin'){
            history.push('/admin/dashboard');
        }else{
            history.push('/user/history');
        }
            }
    }

    const handleSubmit =async (e) =>{
        e.preventDefault();
        try{
            // e.preventDefault();
            setLoading(true);
            const result =  await auth.signInWithEmailAndPassword(email,password);
            if(result.user){
                // const {user} = result;
                const token = (await result.user.getIdTokenResult()).token;
                console.log(token,'checktoken');
                const res = await createOrUpdateUser(token)
                    console.log(res.data,'updateduser');
                await dispatch(loggedIn({
                        id:res.data._id,
                        email:res.data.email,
                        name:res.data.name,
                        role:res.data.role,
                        token:token
                    }));
                    console.log('check3');
                toast.success('Successfully Logged In', {
                    position: toast.POSITION.TOP_RIGHT
                });
                roleBasedRedirect(res);
                // history.push(history.location.state.from);
            }
        } catch(error){
            console.log(error);
            toast.error(error.message, {
                position: toast.POSITION.TOP_RIGHT
            });
        }finally{
            setLoading(false);
        }
        
    }

    const handleGoogleLogin =async (e) =>{
        try{
            // e.preventDefault();
            const result =  await auth.signInWithPopup(googleAuthProvider);
            if(result.user){
                const {user} = result;
                const token = (await user.getIdTokenResult()).token;
                console.log(token);
                const res = await createOrUpdateUser(token)
                    console.log(res.data,'updateduser');
                    dispatch(loggedIn({
                        id:res.data._id,
                        email:res.data.email,
                        name:res.data.name,
                        role:res.data.role,
                        token:token
                    }));
                toast.success('Successfully Logged In', {
                    position: toast.POSITION.TOP_RIGHT
                });
                console.log(history,'history123');
            }
        } catch(error){
            console.log(error);
            toast.error(error.message, {
                position: toast.POSITION.TOP_RIGHT
            });
        }
        
    }

    const registrationForm = () =>
    (<>
   <form>
      <input type='email' className="form-control" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter your email"/>
      <input type='password' className="form-control" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter your password"/>
      <Button 
        type="primary" 
        shape="round" 
        icon={loading ? null : <LoginOutlined />} 
        block
        onClick={handleSubmit}
        disabled={password.length < 6}
        className="mb-3 mt-3"
        size='large'>
             {loading ? <LoadingOutlined/>: "Login With Email/Password"}
             
      </Button>
    </form>
    <Button 
    type="primary" 
    shape="round" 
    icon={<GoogleOutlined />} 
    block
    className="mb-3"
    onClick={handleGoogleLogin}
    size='large'
    danger
    // shape='round'
    >
    Login With Google
  </Button>
  </>
    );

return(
    <div className="container p-5">
        <div className="row">
            <div className="col-md-6 offset-md-3">
            <h1>Login</h1>
            {registrationForm()}
            <Link to='/forgot/password' className="float-right text-danger">Forgot Password ? </Link>
            {/* {<ToastContainer/>} */}
            </div>
        </div>

    </div>
)
}

export default Login;
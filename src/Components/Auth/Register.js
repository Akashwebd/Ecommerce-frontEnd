import React,{useEffect, useState} from "react";
import { Button } from "antd";
import { auth } from "./Firebase";
import { useSelector } from "react-redux";
import { LoginOutlined } from '@ant-design/icons';
import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

function Register({history}){

    const [email,setEmail] = useState('');
    const {user} = useSelector(state => state);
    // console.log(props,'prop',window.location);

    useEffect(()=>{
        if(user.email){
            history.push('/');
        }
    },[user]);

    const handleSubmit =async (e) =>{
        try{
            e.preventDefault();
            console.log(process.env.REACT_APP_REGISTER_URL);
            const config = {
             url:`${process.env.REACT_APP_REGISTER_URL}`,
             handleCodeInApp: true,
            //  apiKey:'abcd'
            }
     
           const response = await auth.sendSignInLinkToEmail(email,config);
           console.log(response,'zxcv');
           toast.success('Link sent to email Id', {
             position: toast.POSITION.TOP_RIGHT
         });
           window.localStorage.setItem('emailForRegistration',email);
        } catch (error){
            console.log(error.message);
            toast.error(error.message, {
                position: toast.POSITION.TOP_RIGHT
            });
        }
        
    }

    const registrationForm = () =>
   <form>
      <input type='email' className="form-control" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter your email"/>
      <Button 
        type="primary" 
        shape="round" 
        icon={<LoginOutlined />} 
        block
        onClick={handleSubmit}
        className="mb-3 mt-3"
        size='large'>
        Submit
      </Button>
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

export default Register;
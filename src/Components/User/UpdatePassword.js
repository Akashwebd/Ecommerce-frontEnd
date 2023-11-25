import React, { useState } from "react";
import UserNav from "./Nav/UserNav";
import { auth } from "../Auth/Firebase";
import { toast } from "react-toastify";
import { Button } from "antd";
import { LoginOutlined } from '@ant-design/icons';

function UpdatePassword(){
    const [password,updatePassword] = useState('');
    const [loading,setLoading] = useState(false);

    const handlePasswordSubmit = async(event) =>{
        try{
            setLoading(true);
            await auth.currentUser.updatePassword(password);
            toast.success('Password Successfully Updated',{
                position:toast.POSITION.TOP_RIGHT
            });
            updatePassword('');
        }catch(error){
            toast.success(error.message,{
                position:toast.POSITION.TOP_RIGHT
            });
        }finally{
            setLoading(false);
        }

    }

    const UpdatePasswordForm = () =>(
      <form>
        <label>Update Password</label>
      <input type='password' className="form-control" value={password} onChange={(e)=>updatePassword(e.target.value)} placeholder="Enter your password"/>
      <Button 
        type="primary" 
        shape="round" 
        icon={<LoginOutlined />} 
        block
        disabled={password.length<6 || loading}
        onClick={handlePasswordSubmit}
        className="mb-3 mt-3"
        size='large'>
        Update Password
      </Button>
    </form>
    );

    return(
    <div className="container-fluid">
    <div className="row">
        <div className="col-md-2">
         <UserNav/>
        </div>
        <div className="col-md-6 offset-md-2 mt-3">
            {UpdatePasswordForm()}
        </div>

    </div>

</div>
);
}

export default UpdatePassword;
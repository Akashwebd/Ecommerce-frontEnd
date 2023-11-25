import React, { useState } from "react";
import Resizer from 'react-image-file-resizer';
import axios from "axios";
import { useSelector } from "react-redux";
import { UserOutlined,LoadingOutlined } from '@ant-design/icons';
import { Button,Select,Avatar, Badge } from "antd";

function ImageUpload({value,setValue}){
    const {user} = useSelector(state=>state);
    const [loading,setLoading] = useState(false);

 const handleImageChange =(event) =>{
   const file = event.target.files;
   const uploadingFiles = value.images;
   if(uploadingFiles){
    setLoading(true);
    for(let i=0;i<file.length;i++){
        Resizer.imageFileResizer(
            file[i],
            720,
            720,
            'JPEG',
            100,
            0,
            (uri) => {
               axios.post(`${process.env.REACT_APP_API_END_POINT}/uploadImage`,{image:uri},{
                headers:{
                    token:user.token
                }
               }).then(res =>{
                setLoading(false);
                uploadingFiles.push(res.data);
                setValue({...value,images:uploadingFiles});
               }).catch(error => {
                setLoading(false);
                console.log(error)
            })
            },
            'base64'
        );
       }
   }

 }  

 const handleImageRemove = (publicID) =>{
    setLoading(true);
axios.post(`${process.env.REACT_APP_API_END_POINT}/removeimage`,{id:publicID},{
    headers:{
        token:user.token
    }
}).then(res =>{
    setLoading(false);
    const {images} = value;
    const filterImages = images.filter(img => img.public_id !== publicID);
    setValue({...value,images:filterImages});
}).catch(error =>{
    setLoading(false);
    console.log(error);
})
 }
 
return(
    <>
    <div className="row">
    {value.images && value.images.map(image => (
        <Badge count='X' key={image.public_id} style={{cursor:'pointer'}} onClick={() =>handleImageRemove(image.public_id)}>
<Avatar shape="square" key={image.public_id} src={image.url} size={100} className="m-3"/>
        </Badge>
    ))
    }
    </div>
    <div className="row">
        <label  className="btn btn-primary btn-raised">
            {loading ? <LoadingOutlined/>:'Choose File'}
            <input type='file' accept="images/*" multiple hidden onChange={handleImageChange}/>
        </label>

    </div>
    </>
)

}

export default ImageUpload;
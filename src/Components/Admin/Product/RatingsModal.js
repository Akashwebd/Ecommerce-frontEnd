import React, { useEffect, useState } from 'react';
import {Modal } from 'antd';
import StarRatings from 'react-star-ratings';
import { useSelector } from 'react-redux';
import {toast} from 'react-toastify';
import { useParams } from "react-router-dom";
import { create_update_Rating,getProduct } from '../../Functions/Product';

function RatingsModal({isModalOpen,setModal,data,getDetails}){
    const [rating,setRating] = useState(0);
    const {user} = useSelector(state => state);
    const slug = useParams();
 

    useEffect(()=>{
        loadRating();
    },[]);

    const loadRating =  () =>{
        console.log(slug,'slug');
            const ratingObject = data.ratings.filter(r => r.postedBy == user.id);
            if(ratingObject.length){
               setRating(ratingObject[0].star);
            }
    }

    const handleOk = async () =>{
        try{
        await create_update_Rating(data._id,user.token,rating);
        getDetails();
        toast.success('Rating Updated Successfully',{
            position:toast.POSITION.TOP_RIGHT
        })
        } 
        catch(error){
            console.log(error);
            toast.error('Ratings Updation Failed',{
                position:toast.POSITION.TOP_RIGHT
            })
        }finally{
            setModal(false);
        }
    }

    const handleCancel = () =>{
        setModal(false);
    }


return(
<>
    <Modal 
    title="Leave Rating" 
    open={isModalOpen} 
    onOk={handleOk} 
    onCancel={handleCancel}>
    <StarRatings
          rating={rating}
          starRatedColor="gold"
          changeRating={(newRating,name)=>setRating(newRating)}
          numberOfStars={5}
          name={user.id}
          starDimension="20px"
          starSpacing="5px"
          isSelectable={true}
          // style={{width:'100%',textAlign:'center'}}
        />
    </Modal>
  </>
  );    
}

export default RatingsModal;
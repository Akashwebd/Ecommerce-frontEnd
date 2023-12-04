import React from "react";
import { Button, Drawer } from 'antd';
import { useSelector,useDispatch } from "react-redux";
import { handleDrawer } from "../Store/Slices/DrawerSlice"; 
import Laptop from '../../Images/laptop.jpg';
import { Link } from "react-router-dom";
import { setNavOptions } from "../Store/Slices/HeaderSlice";

function CartDrawer(){
    const {cart:{cart},drawer} = useSelector(state => ({...state}));
    const style={
        width:'100%',
        height:"200px",
        objectFit:'cover'
    }


    const dispatch = useDispatch();

    const handleClose = () =>{
     dispatch(handleDrawer(false));
    }
return(
    <Drawer title={`Cart - ${cart.length} Product`} placement="right" onClose={handleClose} open={drawer}>
     <div className="text-center row">
     <Link to='/cart' style={{margin:"auto"}}>
    <button
    onClick={()=>{
        dispatch(handleDrawer(false));
        dispatch(setNavOptions('cart'));
    }}
    className="btn btn-sm btn-primary btn-raised btn-block"
    >
        Go To Cart
    </button>
    </Link>
     </div>   
       {cart.map(item => (
        <div className="row" key={item._id}>
            <div className="col p-2">
             {
                item.images.length ?  (
                <>
                <img src={item.images[0].url} style={style} className="text-center"/>
                <p className="text-center bg-secondary text-light">
                 {item.title} X {item.count}   
                </p>
                </>
                ):(
                    <>
                <img src={Laptop}/>
                <p className="text-center bg-secondary text-light">
                 {item.title} x {item.count}   
                </p>
                </>
                )
             }
            </div>

        </div>
       ))}
      </Drawer>
)

}

export default CartDrawer;

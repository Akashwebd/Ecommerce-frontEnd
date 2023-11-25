import React from "react";
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import ProductTableItem from "./ProductTableItem";
import { saveCart } from "../Functions/Cart";


function Cart({history}){
    const {user,cart:{cart}} = useSelector(state => ({...state}));
    // console.log(cart,'checkcart');

    const getTotal = () =>{
        return cart.reduce((init,final) =>(
         init+final.count*final.price
        ),0)
    }

    const showCartItems = () =>{
        console.log(cart,'checkcart');
        return(
            <table className="table table-bordered">
                <thead className="thead-light">
                <tr className="text-center"> 
                    <th>Image</th>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Brand</th>
                    <th>Color</th>
                    <th>Count</th>
                    <th>Shipping</th>
                    <th>Remove</th>
                </tr>
                </thead>
                <tbody>
                {
                    cart.map(product =>(
                        <ProductTableItem product={product}/>
                    ))
                }
                </tbody>

            </table>
        )

    }

    const handleCheckout = async (e) =>{
        e.preventDefault();
        const response = saveCart({cart},user.token);
        if((await response).data.ok){
            history.push('/checkout');
        }
    }
return(
    <div className="container-fluid">
        <div className="row">

            <div className="col-md-8 p-5">
            <h4 className="text-center font-weight-bold display-4">Cart-{cart.length} Products</h4>
            {
                cart.length ? (
                    showCartItems()) : <p className="display-5 text-center width">No Products Found</p>
                
            }
            </div>
            <div className="col-md-4 p-5">
            <h4 className="text-center font-weight-bold display-4"> Order Summary</h4>
            <hr/>
            <h4 className=" font-weight-bold display-4">Products</h4>
            {cart.map(element =>(
            <p><span className="font-weight-bold">{element.title}</span> * <span className="font-weight-bold">{element.count}</span> = 
               $<span className="font-weight-bold">{element.price*element.count}</span></p> 
            ))}
             <hr/>
            <p>Total:<span className="font-weight-bold">{getTotal()}</span></p>
            <hr/>
            {
                user.token?
                <button className="btn btn-sm btn-primary mt-2" disabled={!cart.length} onClick={handleCheckout}>
                Proceed To CheckOut
                </button>
                :
                <button className="btn btn-sm btn-primary mt-2">
                 <Link to={{
                    pathname:'/login',
                    state:{from:'cart'}
                 }}>
                 </Link>   
                Proceed To Login
                </button>
            }

            </div>

        </div>

    </div>
)
}

export default Cart;
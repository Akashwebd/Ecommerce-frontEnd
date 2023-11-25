import React from "react";
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import '../../stripe.css';
import StripeCheckOut from "./StripeCheckout";

const promise = loadStripe(process.env.REACT_APP_STRIPE_KEY)

function Payment(){
return(
    <div className="container text-center p-5">
        <h4 className="display-4">Complete Your Purchase</h4>
        <Elements stripe={promise}>
            <StripeCheckOut/>
        </Elements>

        <div></div>

    </div>
)
}

export default Payment;
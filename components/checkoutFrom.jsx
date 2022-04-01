import {
  PaymentElement,
  useElements,
  useStripe
} from "@stripe/react-stripe-js";

import {useRouter} from 'next/router';
import { request } from "../utils";
import { useState } from "react";
import { useCartContext } from "../contexts/cartContext";
import { sessionStore } from "../utils/constants";
import { AddressForm, ShowBill } from ".";
import { sessionDestroy } from "../utils/constants";
import { handleFailure } from "../utils/helpers";


const CheckoutForm = () => {
    const router = useRouter();

    const elements = useElements();
    const stripe = useStripe();
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage,setErrorMessage] = useState('');

    const [validAdress,setValidAddress] = useState(false); 
    const {cart} = useCartContext();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
        // Stripe.js has not yet loaded.
        // Make sure to disable form submission until Stripe.js has loaded.
        return;
        }
                
        setIsLoading(true);
        // update the database
        const items = cart.map(item => {
            const {id,price,quantity,name} = item;
            return {
                id,price,quantity,name
            };
        });

        const {success,response} = await request(sessionStore,'post',{
            items,
            name: 'order',
            address: {
                state: 'alger',
                address: 'cite 49 logs bt02 n08',
                zip: 16064
            }
        });
        if(!success) {
            handleFailure(response,null,router);
        }
        const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
            // Make sure to change this to your payment completion page
            return_url: "http://localhost:3000/success",
        },
        });

        // This point will only be reached if there is an immediate error when
        // confirming the payment. Otherwise, your customer will be redirected to
        // your `return_url`. For some payment methods like iDEAL, your customer will
        // be redirected to an intermediate site first to authorize the payment, then
        // redirected to the `return_url`.

        // in case of an immediate error un cancel the order in the database.

        // await request(cancelOrderUrl,'delete',{id});
        
        if (error.type === "card_error" || error.type === "validation_error") {
            setErrorMessage(error.message);
        } else {
            setErrorMessage("An unexpected error occured.");
        }
        await request(sessionDestroy,'delete',{name: 'order'});
        setIsLoading(false);
    };
    
    if(!validAdress){
        return (
            <AddressForm setValidAddress={setValidAddress}/>
        );
    }
    return (
        <form id="payment-form" className="stripe-form" onSubmit={handleSubmit}>
            <PaymentElement id="payment-element" />
            <ShowBill />

            <button disabled={isLoading || !stripe || !elements} className='stripe-button' id="submit">
                <span id="button-text">
                    {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
                </span>
            </button>

            {errorMessage && <div className="red center">{errorMessage}</div>}
        </form>
  );
}

export default CheckoutForm;
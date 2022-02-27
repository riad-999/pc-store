import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";

import { handleOrderUrl} from "../utils/constants";
import { request } from "../utils";
import { useState, useEffect } from "react";
import { useCartContext } from "../contexts/cartContext";
import { UseUIContext } from "../contexts/UIConttext";
import { isOnServer } from "../utils/helpers";
import { AddressForm, ShowBill } from ".";


const CheckoutForm = () => {
    const {setError} = UseUIContext();

    const stripe = useStripe();
    const elements = useElements();

    const [validAdress,setValidAddress] = useState(false); 
    const [loading,setLoading] = useState(false);

    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const {cart, clearCart, shippingFee, totalAmount} = useCartContext();

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

        const {success,response} = await request(handleOrderUrl,'post',{
            items,
            address: {
                state: 'alger',
                address: 'cite 49 logs bt02 n08',
                zip: 16064
            }
        });
        let id = null;
        if(!response) {
            setError({
                type: 'network',
                message: 'network error, refresh the page or try later'
            });
        }
        if(success) {
            if(!isOnServer())
                // used when redirecting
                localStorage.setItem('redirect',1);
        } 

        const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
            // Make sure to change this to your payment completion page
            return_url: "http://localhost:3000/checkout",
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
            setMessage(error.message);
        } else {
            setMessage("An unexpected error occured.");
        }
        setIsLoading(false);
    };
    useEffect(() => {
        if (!stripe) {
            return;
        }

        const clientSecret = new URLSearchParams(window.location.search).get(
        "payment_intent_client_secret"
        );

        if (!clientSecret) {
            return;
        }
        
        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
            setValidAddress(true);
            if(!cart.length)
                return;
            (async () => {
                switch (paymentIntent.status) {

                    case "succeeded":
                    // update the database
                    setLoading(true);
                    
                    const items = cart.map(item => {
                        const {id,price,quantity,name} = item;
                        return {
                            id,price,quantity,name
                        };
                    });
                    const address = !isOnServer() && localStorage.getItem('address')  ? JSON.parse(localStorage.getItem('address')) : null;

                    const {success,response} = await request(handleOrderUrl,'post',{
                        items,
                        address
                    });

                    let id = null;
                    if(!response) {
                        setError({
                            type: 'network',
                            message: 'network error, refresh the page or try later'
                        });
                    }
                    if(success) {
                        id = response.data.id;
                        if(!isOnServer())
                            localStorage.setItem('order_id',id);
                    } 

                    setMessage("Payment succeeded!");
                    setLoading(false);
                    clearCart();

                    break;

                    case "processing":

                    setMessage("Your payment is processing.");

                    break;

                    case "requires_payment_method":

                    setMessage("Your payment was not successful, please try again.");

                    break;

                    default:

                    setMessage("Something went wrong.");

                    break;

                }
            })();
        });

    }, [stripe]);
    let redirect = null;
    if(!isOnServer()) {
        redirect = localStorage.getItem('redirect');
        localStorage.removeItem('redirect');
    }

    if(loading){
        return (
            <h2 className="center">
                Almost Done...
            </h2>
        );
    } 
    if(!validAdress && !redirect){
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

        {/* Show any error or success messages */}

        {message && <div id="payment-message">{message}</div>}
        </form>
  );
}

export default CheckoutForm;
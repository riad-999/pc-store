import {
  PaymentElement,
  useElements,
  useStripe
} from "@stripe/react-stripe-js";

import {useRouter} from 'next/router';
import { request } from "../utils";
import { useState, useEffect } from "react";
import { useCartContext } from "../contexts/cartContext";
import { sessionStore } from "../utils/constants";
import { AddressForm, ShowBill } from ".";
import { sessionDestroy } from "../utils/constants";
import { handleFailure } from "../utils/helpers";
import { UseUIContext } from "../contexts/UIConttext";


const CheckoutForm = () => {
    const router = useRouter();

    const elements = useElements();
    const stripe = useStripe();
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage,setErrorMessage] = useState('');

    const {user:{address,zip,state}} = UseUIContext();
    const [validAdress,setValidAddress] = useState(false); 
    const [addr,setAddr] = useState({address,zip,state});
    const [invalidQuantity,setInvalidQuantity] = useState(false);
    const {cart} = useCartContext();

    // const test = async () => {
    //     const items = cart.map(item => {
    //         const {id,price,quantity,name} = item;
    //         return {
    //             id,price,quantity,name
    //         };
    //     });
    //     const {success,response} = await request(sessionStore,'post',{
    //         items,
    //         name: 'order',
    //         address: {
    //             state: addr.state,
    //             address: addr.address,
    //             zip: addr.zip
    //         }
    //     });
    //     console.log(response);
    // }

    // useEffect(() => {
    //     test();
    // },[]);

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
            address: {
                state: addr.state,
                address: addr.address,
                zip: addr.zip
            }
        });
        if(!success) {
            handleFailure(response,null,router);
        }
        else {
            if(response.data.invalid) {
                setInvalidQuantity(response.data.messages);
            }
            else {
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
                if (error.type === "card_error" || error.type === "validation_error") {
                    setErrorMessage(error.message);
                } else {
                    setErrorMessage("An unexpected error occured.");
                }
                await request(sessionDestroy,'delete',{name: 'order'});
                setIsLoading(false);
            }
        }
    };
    
    if(!validAdress){
        return (
            <AddressForm addr={addr} setAddr={setAddr} setValidAddress={setValidAddress}/>
        );
    }
    if(invalidQuantity) {
        return (
            <section>
                <h4>sorry, some products aren't availabe:</h4>
                {
                    invalidQuantity.map((message,index) => <h5 className="green" key={index}>{message}</h5>)
                }
                <p>you need to alter your cart in order to continue the payment</p>
            </section>
        );
    }
    return (
        <form id="payment-form" className="stripe-form" onSubmit={handleSubmit}>
            <div className="green">test number: 4242 4242 4242 4242</div>
            <div className="green">expiration: anything after current date</div>
            <div className="green mb-1">CVC: anything (3 digits)</div>
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
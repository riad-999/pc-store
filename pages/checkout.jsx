import { useState, useEffect } from 'react';
import { useCartContext } from '../contexts/cartContext';
import { PublicStripeKey, paymentIntentUrl } from '../utils/constants';
import { Loading, CheckoutForm } from '../components';
import { Layout } from '../components';
import { request } from '../utils';
import { handleFailure } from '../utils/helpers';
import {useRouter} from 'next/router';

// stripe imports
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
// import CheckoutForm from "./CheckoutForm";



// Make sure to call loadStripe outside of a component’s render to avoid

// recreating the Stripe object on every render.

// This is your test publishable API key.

const stripePromise = loadStripe(PublicStripeKey);

const Checkout = () => {
    const {cart} = useCartContext();
    const [clientSecret, setClientSecret] = useState("");
    const router = useRouter();

    const appearance = {
        theme: 'night',
    };
    const options = {
        clientSecret,
        appearance,
    };

    const getPaymentIntent = async () => {
        const IDs = cart.map(product => {
            const {name,id,quantity} = product;
            return {id,name,quantity}
        });
        const {success,response} = await request(paymentIntentUrl,'post',{IDs});
        if(!success) {
            handleFailure(response,null,router);
        }
        else {
            setClientSecret(response.data.clientSecret);
        }
    };
    useEffect(() => {
    // Create PaymentIntent as soon as the page loads
        if(cart.length === 0)
            return;
        getPaymentIntent();
    },[]);

    return (
        <>  
            <Layout auth={true}>
                <main className='main-content'>
                    {cart.length == 0 ? <h5 className='center'>your cart is empty</h5> : clientSecret ? 
                    <Elements options={options} stripe={stripePromise}>
                        <CheckoutForm />
                    </Elements> : 
                    <Loading /> 
                    }            
                </main>
            </Layout>
        </>
    );
}

export default Checkout;
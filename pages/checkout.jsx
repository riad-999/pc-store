import { Navbar, Sidebar, CartProduct,CartFooter } from '../components';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCartContext } from '../contexts/cartContext';
import axios from 'axios';
import { PublicStripeKey, paymentIntentUrl } from '../utils/constants';
import { Loading, CheckoutForm } from '../components';
import { isOnServer } from '../utils/helpers';
import { UseUIContext } from '../contexts/UIConttext';
import { Error } from '../components';

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
    const [errorMessage, setErrorMessage] = useState("");

    const {isAuth, error: UIConttextError} = UseUIContext();
    console.log(UIConttextError);
    const appearance = {
        theme: 'night',
    };
    const options = {
        clientSecret,
        appearance,
    };

    const getPaymentIntent = async () => {
        try {
            const url = 'http://localhost:8000/sanctum/csrf-cookie';
            if(!isOnServer() && document.cookie.indexOf('XSRF-TOKEN='))
                await axios.get(url,{withCredentials: true});
            const IDs = cart.map(product => {
                const {name,id,quantity} = product;
                return {
                    id,name,quantity
                };
            });
            const response = await axios.post(paymentIntentUrl,{IDs},{
                headers: {
                    Accept: 'application/json'
                },
                withCredentials: true
            });
            setClientSecret(response.data.clientSecret);
        } catch(error) {
            console.log(error);
            if(!error.response)
                setErrorMessage("Network Error");
            else if(error.response.status === 401)
                setErrorMessage('you need to login first');
            else
                setErrorMessage('unexpected error occured');
            setClientSecret('none');
        }
    };
    useEffect(() => {
    // Create PaymentIntent as soon as the page loads
        getPaymentIntent();
    },[]);
    if(UIConttextError) {
        return (
            <Error />
        );
    }
    if(!clientSecret){
        return (
            <>  
                <Navbar />
                <Sidebar />
                <main className='main-content'>
                    <Loading className='mauto'/> 
                </main>
            </>
        );
    }
    return (
        <>  
            <Navbar />
            <Sidebar />
            <main className='main-content'>
                { 
                !errorMessage ?
                <Elements options={options} stripe={stripePromise}>
                    <CheckoutForm />
                </Elements> :
                <section>
                    <h4 className="center">{errorMessage}</h4>
                    {isAuth === false && 
                    <Link href="/session/login" passHref>
                        <button type='button' className='btn btn--big btn--center'>
                            <a>Login</a>
                        </button>
                    </Link>
                    }
                </section>
                }
            </main>
        </>
    );
}


// export const getServerSideProps = async () => {
//     try {
//         const response = await axios.get(authUrl,{withCredentials: true});
//         return {
//             props: {
//                 isAuth: true
//             }
//         }
//     } catch (error) {
//         return {
//             redirect: {
//             permanent: false,
//             destination: "/login",
//         },
//             props:{
//                 message: 'you need to login to proceed chechout'
//             },
//         };
//     }
// }

export default Checkout;
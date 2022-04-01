import { Layout } from "../components"
import {
  useStripe,Elements
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Loading } from "../components";
import { PublicStripeKey } from "../utils/constants";
import {useState, useEffect} from 'react';
import { handleOrderUrl } from "../utils/constants";
import { request } from "../utils";
import { UseUIContext } from "../contexts/UIConttext";

const Succeed = () => {
    const stripe = useStripe();
    const {clearCart} = UseUIContext();
    const [message, setMessage] = useState(null);
    const [loading,setLoading] = useState(false);

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
            (async () => {
                switch (paymentIntent.status) {

                    case "succeeded":
                    // update database
                    setLoading(true);
                    await request(handleOrderUrl,'post');
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

    return (
        <main className="main-content">
            {
                loading ? <Loading /> : 
                message && <h4 className="center" id="payment-message">{message}</h4>
            }
        </main>
    );
}
const stripePromise = loadStripe(PublicStripeKey);
const SucceedPage = () => {
    return (
        <Layout auth={true}>
            <Elements stripe={stripePromise}>
                <Succeed />
            </Elements>
        </Layout>
    );
}
export default SucceedPage;
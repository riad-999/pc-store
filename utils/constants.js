const links = [
    {
        id : 1,
        name : 'home',
        path : '/'
    },
    {
        id : 2,
        name : 'about us',
        path : '/about'
    },
    {
        id : 3,
        name : 'products',
    path : '/products'
    }
];

const productsUrl = 'http://localhost:8000/api/products';
const featuredProductsUrl = 'http://localhost:8000/api/featuredproducts';
const resgisterUrl = 'http://localhost:8000/api/register';
export const loginUrl = 'http://localhost:8000/api/login';
export const logoutUrl = 'http://localhost:8000/api/logout';
export const imagesUrl = 'http://localhost:8000/storage/images';
export const authUrl = 'http://localhost:8000/api/auth';
export const paymentIntentUrl = 'http://localhost:8000/api/createPaymentIntent';
export const handleOrderUrl = 'http://localhost:8000/api/handleOrder';
export const cancelOrderUrl = 'http://localhost:8000/api/cancelOrder';
export const checkAddressUrl = 'http://localhost:8000/api/checkAddress';
export const csrfUrl = 'http://localhost:8000/sanctum/csrf-cookie';
export const PublicStripeKey = 'pk_test_51JqxaPBINvQh3CaAv2mm2adtPReOBKKA4iOSSiTer9RT7rqb2O9HvQ6qEaIpHyK2mIqX9nsFyD6y9ZuYEDfMqpaX00mvrR3ezD';
const shippingFee = 1000;

export {links,productsUrl,featuredProductsUrl,shippingFee,resgisterUrl};
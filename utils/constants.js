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

const productsUrl = 'https://intense-badlands-27342.herokuapp.com/api/products';
const featuredProductsUrl = 'https://intense-badlands-27342.herokuapp.com/api/featuredproducts';
const resgisterUrl = 'https://intense-badlands-27342.herokuapp.com/api/register';
export const allProductsUrl = 'https://intense-badlands-27342.herokuapp.com/api/allProducts';
export const loginUrl = 'https://intense-badlands-27342.herokuapp.com/api/login';
export const logoutUrl = 'https://intense-badlands-27342.herokuapp.com/api/logout';
export const imagesUrl = 'https://res.cloudinary.com/daanxed31/image/upload/v1650385270/tech-store';
export const authUrl = 'https://intense-badlands-27342.herokuapp.com/api/auth';
export const paymentIntentUrl = 'https://intense-badlands-27342.herokuapp.com/api/createPaymentIntent';
export const handleOrderUrl = 'https://intense-badlands-27342.herokuapp.com/api/orders/store';
export const cancelOrderUrl = 'https://intense-badlands-27342.herokuapp.com/api/cancelOrder';
export const checkAddressUrl = 'https://intense-badlands-27342.herokuapp.com/api/checkAddress';
export const csrfUrl = 'https://intense-badlands-27342.herokuapp.com/sanctum/csrf-cookie';
export const ordersUrl = 'https://intense-badlands-27342.herokuapp.com/api/orders';
export const productReviewUrl = 'https://intense-badlands-27342.herokuapp.com/api/productReview';
export const createProductUrl = 'https://intense-badlands-27342.herokuapp.com/api/products/store';
export const archiveProductUrl = 'https://intense-badlands-27342.herokuapp.com/api/products/archive';
export const updateProductUrl = 'https://intense-badlands-27342.herokuapp.com/api/products/update';
export const storeSessionUrl = 'https://intense-badlands-27342.herokuapp.com/api/sessionStore';
export const orderDeliverUrl = 'https://intense-badlands-27342.herokuapp.com/api/orders/deliver';
export const sessionStore = 'https://intense-badlands-27342.herokuapp.com/api/orders/save';
export const sessionDestroy = 'https://intense-badlands-27342.herokuapp.com/api/session';
export const userOrdersUrl = 'https://intense-badlands-27342.herokuapp.com/api/userOrders';
export const PublicStripeKey = 'pk_test_51JqxaPBINvQh3CaAv2mm2adtPReOBKKA4iOSSiTer9RT7rqb2O9HvQ6qEaIpHyK2mIqX9nsFyD6y9ZuYEDfMqpaX00mvrR3ezD';
const shippingFee = 1000;
export {links,productsUrl,featuredProductsUrl,shippingFee,resgisterUrl};
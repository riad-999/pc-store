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
const apiEndPoint2 = 'https://pc-store-api.riadfelih.com/api/';
const apiEndPoint = 'https://intense-badlands-27342.herokuapp.com/api/';
const productsUrl = apiEndPoint + 'products';
const featuredProductsUrl = apiEndPoint + 'featuredproducts';
const resgisterUrl = apiEndPoint + 'register';
export const allProductsUrl = apiEndPoint + 'allProducts';
export const loginUrl = apiEndPoint + 'login';
export const logoutUrl = apiEndPoint + 'logout';
export const imagesUrl = 'https://res.cloudinary.com/daanxed31/image/upload/v1650385270/tech-store';
export const authUrl = apiEndPoint + 'auth';
export const paymentIntentUrl = apiEndPoint + 'createPaymentIntent';
export const handleOrderUrl = apiEndPoint + 'orders/store';
export const cancelOrderUrl = apiEndPoint + 'cancelOrder';
export const checkAddressUrl = apiEndPoint + 'checkAddress';
export const csrfUrl = 'https://intense-badlands-27342.herokuapp.com/sanctum/csrf-cookie';
export const ordersUrl = apiEndPoint + 'orders';
export const productReviewUrl = apiEndPoint + 'productReview';
export const createProductUrl = apiEndPoint + 'products/store';
export const archiveProductUrl = apiEndPoint + 'products/archive';
export const updateProductUrl = apiEndPoint + 'products/update';
export const storeSessionUrl = apiEndPoint + 'sessionStore';
export const orderDeliverUrl = apiEndPoint + 'orders/deliver';
export const sessionStore = apiEndPoint + 'orders/save';
export const sessionDestroy = apiEndPoint + 'session';
export const userOrdersUrl = apiEndPoint + 'userOrders';
export const PublicStripeKey = 'pk_test_51JqxaPBINvQh3CaAv2mm2adtPReOBKKA4iOSSiTer9RT7rqb2O9HvQ6qEaIpHyK2mIqX9nsFyD6y9ZuYEDfMqpaX00mvrR3ezD';
const shippingFee = 1000;
export {links,productsUrl,featuredProductsUrl,shippingFee,resgisterUrl};
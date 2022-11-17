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
const apiEndPoint = 'https://pc-store-api.riadfelih.com/api/';
const apiEndPoint2 = 'https://intense-badlands-27342.herokuapp.com/api/';
const productsUrl = apiEndPoint2 + 'products';
const featuredProductsUrl = apiEndPoint2 + 'featuredproducts';
const resgisterUrl = apiEndPoint2 + 'register';
export const allProductsUrl = apiEndPoint2 + 'allProducts';
export const loginUrl = apiEndPoint2 + 'login';
export const logoutUrl = apiEndPoint2 + 'logout';
export const imagesUrl = 'https://res.cloudinary.com/daanxed31/image/upload/v1650385270/tech-store';
export const authUrl = apiEndPoint2 + 'auth';
export const paymentIntentUrl = apiEndPoint2 + 'createPaymentIntent';
export const handleOrderUrl = apiEndPoint2 + 'orders/store';
export const cancelOrderUrl = apiEndPoint2 + 'cancelOrder';
export const checkAddressUrl = apiEndPoint2 + 'checkAddress';
export const csrfUrl = 'https://intense-badlands-27342.herokuapp.com/sanctum/csrf-cookie';
export const ordersUrl = apiEndPoint2 + 'orders';
export const productReviewUrl = apiEndPoint2 + 'productReview';
export const createProductUrl = apiEndPoint2 + 'products/store';
export const archiveProductUrl = apiEndPoint2 + 'products/archive';
export const updateProductUrl = apiEndPoint2 + 'products/update';
export const storeSessionUrl = apiEndPoint2 + 'sessionStore';
export const orderDeliverUrl = apiEndPoint2 + 'orders/deliver';
export const sessionStore = apiEndPoint2 + 'orders/save';
export const sessionDestroy = apiEndPoint2 + 'session';
export const userOrdersUrl = apiEndPoint2 + 'userOrders';
export const PublicStripeKey = 'pk_test_51JqxaPBINvQh3CaAv2mm2adtPReOBKKA4iOSSiTer9RT7rqb2O9HvQ6qEaIpHyK2mIqX9nsFyD6y9ZuYEDfMqpaX00mvrR3ezD';
const shippingFee = 1000;
export {links,productsUrl,featuredProductsUrl,shippingFee,resgisterUrl};
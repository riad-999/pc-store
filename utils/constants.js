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
const shippingFee = 550;

export {links,productsUrl,featuredProductsUrl,shippingFee};
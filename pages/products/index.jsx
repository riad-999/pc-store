import { Footer, MainFilters, Navbar, Sidebar, ProductsSection, BackTotopBtn, Loading } from "../../components";
import { productsUrl } from "../../utils/constants";
import axios from "axios";
import { useFilterContext } from "../../contexts/filterContext";
import { useEffect } from "react";

const Products = ({products}) => {
    const {setProducts,filteredProducts, products: allProducts} = useFilterContext();
    useEffect(() => {
        setProducts(products);
    },[]);
    return (
        <>
            <Navbar />
            <Sidebar />
            <main className="main-content">
                <MainFilters />
                {
                    !filteredProducts.length && !allProducts.length ? 
                    <Loading /> :  (!filteredProducts.length && allProducts.length ? 
                    <div className="center mt-5">
                        <h4>sorry, No matching products for your filters.</h4>
                    </div> : 
                    <ProductsSection products={filteredProducts}/>)
                }
            </main>
            <BackTotopBtn />
        </>
    );
}  

export const getServerSideProps = async () => {
    try {
        const response = await axios(productsUrl);
        const products = response.data.data;
        return {
            props: {
                products
            }
        }
    } catch (error) {
        console.log(error);
        return {
            props: {
                products: []
            }
        }
    }
}
export default Products;
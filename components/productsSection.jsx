import { ProductCard } from ".";

const ProductsSection = ({products}) => {
    return (
        <section className="products products-grid-3">
            {
                products.map(product => <ProductCard key={product.id} product={product} />)
            }
        </section>
    );
}

export default ProductsSection;
import Link from 'next/link';
import { ProductCard } from '.';

const FeaturedProducts = ({products}) => {
    const upperSectionProducts = products.slice(0,2);
    const lowerSectionProducts = products.slice(2,5);
    return (
        <section className='featured'>
            <h3 className="featured__title">latest products</h3>
            <section className="products-grid-2">
                {
                    upperSectionProducts.map(product => {
                    return <ProductCard key={product.id} product={product} />
                    })
                }
            </section>
            <section className="products-grid-3">
                {
                    lowerSectionProducts.map(product => {
                    return <ProductCard key={product.id} product={product} />   
                    })
                }
            </section>
            <button type="button" className='btn btn--big btn--center'>
                <Link href="/products/index">
                    <a>See All Products</a>
                </Link>
            </button>
        </section>
    );
}

export default FeaturedProducts;
import { Count, Navbar, Sidebar, Review, Feedback } from "../../../components";
import Image from "next/image";
import { productsUrl } from "../../../utils/constants";
import axios from "axios";

const SingleProduct = ({product}) => {
    const {description,price,name,images,score,sold,comments,total_reviews,quantity} = product;
    let converted = price / 100;
    converted = converted.toFixed(2);
    return (   
        <>
            <Navbar />
            <Sidebar />
            <main className="main-content">
                <section className="single-product">
                    <div className="images">
                        <div className="current-image__wrapper">
                            <Image src={`/images/${images.main}`} alt="products image" objectFit="cover" layout="fill" />
                        </div>
                        <div className="other-images">
                            <button type="button" className="image__wrapper">
                                <Image src="/images/home.jpg" alt="product image" objectFit="cover" layout="fill" />
                            </button>
                            <button type="button" className="image__wrapper">
                                <Image src="/images/home.jpg" alt="product image" objectFit="cover" layout="fill" />
                            </button>
                            <button type="button" className="image__wrapper">
                                <Image src="/images/home.jpg" alt="product image" objectFit="cover" layout="fill" />
                            </button>
                            <button type="button" className="image__wrapper">
                                <Image src="/images/home.jpg" alt="product image" objectFit="cover" layout="fill" />
                            </button>
                        </div>
                    </div>
                    <div className="single-product__info">
                        <section className="desc">
                            <h3>{name}</h3>
                            <div className="single-product__review">
                                <Review score={score} totalReviews={total_reviews}/>
                            </div>
                            <div className="single-product__price green">
                                ${converted}
                            </div>
                            <p className="single-product__desc">
                                {description}
                            </p>
                            <div>
                                <span className="fixed-width">in stock</span> : {quantity} available
                            </div>
                            <div>
                                <span className="fixed-width">sold</span> : {sold}
                            </div>
                            <div>
                                <span className="fixed-width">shippment</span> : 1-4 days
                            </div>
                        </section>
                        <Count product={product}/>
                    </div>
                </section>
                <section className="reviews">
                    <h3>costumers Reviews</h3>
                    {
                        comments.map((comment,index) => <Feedback totalReviews={total_reviews} key={index} comment={comment} />)
                    }
                </section>
            </main>

        </>
    );
}

export const getServerSideProps = async (context) => {
    const id = context.params.slug;
    const url = `${productsUrl}/${id}`;
    try {
        const response = await axios(url);
        const product = response.data.data;
        return {
            props: {
                product
            }
        }
    } catch (error) {
        return {
            props: {
                product: null
            }
        }
    }
}

export default SingleProduct;
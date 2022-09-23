import { Count, Navbar, Sidebar, Review, Feedback } from "../../../components";
import Image from "next/image";
import { productsUrl } from "../../../utils/constants";
import axios from "axios";
import { imagesUrl } from "../../../utils/constants";
import { useState } from "react";
import { Alert } from "../../../components";

const SingleProduct = ({product}) => {
    const {description,price,name,images,score,sold,comments,total_reviews,quantity} = product;
    let converted = price / 100;
    converted = converted.toFixed(2);
    const [currentImage,setCurrentImage] = useState(images.main);
    const [alert,setAlert] = useState({type: 'success', message: '', show: false});

    return (   
        <>
            <Navbar />
            <Sidebar />
            <Alert alert={alert} setAlert={setAlert}/>
            <main className="main-content">
                <section className="single-product">
                    <div className="images">
                        <div className="current-image__wrapper">
                            <Image src={`${imagesUrl}/${currentImage}`} alt="products image" objectFit="cover" layout="fill" />
                        </div>
                        <div className="other-images">
                            <button type="button" className={currentImage === images.main ? "image__wrapper outline" : "image__wrapper"}>
                                <Image src={`${imagesUrl}/${images.main}`} onClick={() => setCurrentImage(images.main)} alt="product image" objectFit="cover" layout="fill" />
                            </button>
                            {
                                images.others.map((image,index) => {
                                    return(
                                        <button type="button" key={index} className={currentImage === image ? "image__wrapper outline" : "image__wrapper"} onClick={() => setCurrentImage(image)}>
                                            <Image src={`${imagesUrl}/${image}`} alt="product image" objectFit="cover" layout="fill" />
                                        </button>
                                    );
                                })
                            }
                        </div>
                    </div>
                    <div className="single-product__info">
                        <section className="desc">
                            <h3>{name}</h3>
                            {/* <div className="single-product__review">
                                <Review score={score} totalReviews={total_reviews}/>
                            </div> */}
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
                        <Count product={product} setAlert={setAlert} />
                    </div>
                </section>
                {/* <section className="reviews">
                    <h3>costumers Reviews</h3>
                    {   comments.length ?
                        comments.map((comment,index) => <Feedback totalReviews={total_reviews} key={index} comment={comment} />) :
                        <h5>no reviews for this products</h5>
                    }
                </section> */}
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
        };
    } catch (error) {
        return {
            props:{
                product: null
            },
        };
    }
}

export default SingleProduct;
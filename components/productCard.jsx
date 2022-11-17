import Link from "next/link";
import Image from "next/image";
import { Review } from ".";
import { imagesUrl } from "../utils/constants";

const ProductCard = ({product}) => {
    const {name,images,price,id: slug,description,score,total_reviews} = product;
    let converted = price / 100;
    converted = converted.toFixed(2);
    const image = images.main;
    return (
        <article className="product">
            <div>
                <Link href={`/products/show/${slug}`}>
                    <a className="product__img">
                        <Image src={`${imagesUrl}/${image}`} alt="product image" objectFit="cover" layout="fill"/>
                    </a>
                </Link>
            </div>
            <div className="product__info">
                <Review score={score} totalReviews={total_reviews} />
                <h4>{name}</h4>
                <p className="product__desc">
                    {`${description.substring(0,70)}...`}
                </p>
                <Link href={`/porducts/show/${slug}`}>
                    <a>
                        <small>See More</small>
                    </a>
                </Link>
                <h5>${converted}</h5>
            </div>
        </article>
    );
}

export default ProductCard;
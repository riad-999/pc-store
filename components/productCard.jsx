const ProductCard = (props) => {
    const {name,image,price} = props;
    return (
        <article class="product">
            <div class="product__img">
                <Image src={`/images/${image}`} alt="product image" />
            </div>
            <div className="product__info">
                <h4>{name}</h4>
                <h5>${price}</h5>
            </div>
        </article>
    );
}

export default ProductCard;
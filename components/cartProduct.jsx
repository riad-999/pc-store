import { BsFillTrashFill } from 'react-icons/bs';
import Image from 'next/image';
import { CartCount } from '.';
import { toPrice } from '../utils/helpers';
import { useCartContext } from '../contexts/cartContext';
import { imagesUrl } from '../utils/constants';

const CartProduct = ({id,name,price,quantity,images,max}) => {
    const { removeProduct } = useCartContext();
    const image = images.main; 
    return (
        <article className='cart__product'>
            <div className='cart__image'>
                <div className='cart__product__image-wrapper'>
                    <Image src={`${imagesUrl}/${image}`} alt="product image" layout='fill' objectFit='cover' />
                </div>
                <h5>{name}</h5>
                <h5 className='green mob'>${price}</h5>
            </div>
            <div className='green opt'>
                ${toPrice(price)}
            </div>
            <div>
                <CartCount quantity={quantity} id={id} max={max}/>
            </div>
            <div className='green opt'>
                ${toPrice(quantity * price)}
            </div>
            <button type="button" className='red cart__remove' onClick={() => removeProduct(id)}>
                <BsFillTrashFill />
            </button>
        </article>
    );
}

export default CartProduct;
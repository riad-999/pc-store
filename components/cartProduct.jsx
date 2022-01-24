import { BsFillTrashFill } from 'react-icons/bs';
import Image from 'next/image';
import { CartCount } from '.';
import { toPrice } from '../utils/helpers';

const CartProduct = ({name,price,quantity,images}) => {
    return (
        <article className='cart__product'>
            <div className='cart__image'>
                <div className='cart__product__image-wrapper'>
                    <Image src="/images/home.jpg" alt="product image" layout='fill' objectFit='cover' />
                </div>
                <h5>{name}</h5>
                <h5 className='green mob'>${price}</h5>
            </div>
            <div className='green opt'>
                ${toPrice(price)}
            </div>
            <div>
                <CartCount />
            </div>
            <div className='green opt'>
                ${toPrice(quantity * price)}
            </div>
            <button type="button" className='red cart__remove'>
                <BsFillTrashFill />
            </button>
        </article>
    );
}

export default CartProduct;
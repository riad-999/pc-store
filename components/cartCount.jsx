import { AiOutlinePlus } from 'react-icons/ai';
import { AiOutlineMinus } from 'react-icons/ai';
import { useCartContext } from '../contexts/cartContext';


const CartCount = ({id,quantity,max}) => {
    const {alter_product_quantity} = useCartContext();

    const increase = () => {
        if(quantity < max) {
            alter_product_quantity(id,1)
        }
    }
    const decrease = () => {
        if(quantity > 1)
            alter_product_quantity(id,0);
    }

    return (
        <div className="cart-count">
            <button type="button" onClick={decrease}>
                <AiOutlineMinus />
            </button>
            <h3>{quantity}</h3>
            <button type="button" onClick={increase}>
                <AiOutlinePlus />
            </button>
        </div>
    );
}

export default CartCount;
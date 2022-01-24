import { AiOutlinePlus } from 'react-icons/ai';
import { AiOutlineMinus } from 'react-icons/ai';
import { useState } from 'react/cjs/react.development';

const CartCount = () => {
    const [count,setCount] = useState(1);

    return (
        <div className="cart-count">
            <button type="button">
                <AiOutlineMinus />
            </button>
            <h3>{count}</h3>
            <button type="button">
                <AiOutlinePlus />
            </button>
        </div>
    );
}

export default CartCount;
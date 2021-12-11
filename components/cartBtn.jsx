import { FaShoppingCart } from "react-icons/fa";

const CartBtn = () => {
    return (
        <button type="button" className="cart">
            <FaShoppingCart/>
            <div className="cart__count">12</div>
        </button>
    );
}

export default CartBtn;
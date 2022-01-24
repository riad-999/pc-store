import { FaShoppingCart } from "react-icons/fa";
import Link from "next/link";

const CartBtn = () => {
    return (
        <Link href="/cart">
            <button type="button" className="cart">
                <a><FaShoppingCart/></a>
                <div className="cart__count">12</div>
            </button>
        </Link>
    );
}

export default CartBtn;
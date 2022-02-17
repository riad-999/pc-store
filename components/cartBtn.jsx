import { FaShoppingCart } from "react-icons/fa";
import Link from "next/link";
import { useCartContext } from "../contexts/cartContext";

const CartBtn = () => {
    const {totalItems} = useCartContext();
    return (
        <Link href="/cart">
            <button type="button" className="cart">
                <a><FaShoppingCart/></a>
                <div className="cart__count">{totalItems}</div>
            </button>
        </Link>
    );
}

export default CartBtn;
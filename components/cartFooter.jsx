import Link from "next/link";
import { ShowBill } from ".";

const CartFooter = () => {
    return (
        <>
            <footer className='cart__footer'>
                <ShowBill />      
                <div>
                    <button type="button" className='btn'>
                        <Link href="/checkout">
                            <a>proceed checkout</a>
                        </Link>
                    </button>
                </div>
            </footer>
        </>
    );
}

export default CartFooter;
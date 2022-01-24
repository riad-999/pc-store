import Link from "next/link";

const CartFooter = () => {
    return (
        <>
            <footer className='cart__footer'>
                <div className='mb-2'>
                    <div>
                        <span className='fixed-w'>
                            Subtotal:
                        </span> $999
                    </div>
                    <div>
                        <span className='fixed-w'>
                            Shipping fee:
                        </span> $9
                    </div>
                    <div className='mb-1'>
                        <span className='fixed-w'>
                            total:
                        </span> $1100
                    </div>
                </div>
                <div>
                    <button type="button" className='btn'>
                        <Link href="/chekout">
                            <a>proceed checkout</a>
                        </Link>
                    </button>
                </div>
            </footer>
        </>
    );
}

export default CartFooter;
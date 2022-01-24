import { Navbar, Sidebar, CartProduct,CartFooter } from '../components';
import Link from 'next/link';
import { useCartContext } from '../contexts/cartContext';

const Cart = () => {
    const { cart } = useCartContext();
    return (
        <>  
            <Navbar />
            <Sidebar />
            <main className='main-content'>
                <section className='cart-products'>
                    <header className='cart__header'>
                        <div>Product</div>
                        <div className='opt'>Price</div>
                        <div>Quantity</div>
                        <div className='opt'>Subtotal</div>
                        <div></div>
                    </header>
                    <main className='cart__products'>
                        {
                            cart.map(product => <CartProduct key={product.id} {...product} />)
                        }
                        {/* <CartProduct />
                        <CartProduct /> */}
                        <button type="button" className='btn btn--red block mb-1'>
                            remover all
                        </button>
                        
                        <button type="button" className='btn'>
                            <Link href="/products">
                                <a>countiue shopping</a>
                            </Link>
                        </button>                        
                    </main>
                    <CartFooter />
                </section>
            </main>
        </>
    );
}

export default Cart;
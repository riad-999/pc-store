import Link from "next/link";
import { useState } from "react";
import { AiOutlinePlus } from 'react-icons/ai';
import { AiOutlineMinus } from 'react-icons/ai';
import { BsFillCartPlusFill } from 'react-icons/bs';
import { useCartContext } from "../contexts/cartContext";

const Count = ({product}) => {
    const [count,setCount] = useState(1);
    const {addToCart} = useCartContext();

    return(
        <>
            <section className="count">
                <button type="button" className="">
                    <AiOutlineMinus />
                </button>
                <h3>{count}</h3>
                <button type="button">
                    <AiOutlinePlus />
                </button>
            </section>
            <button type="button" className="btn">
                <Link href="/chekout">
                    <a>proceed checkout</a>
                </Link>
            </button>
            <button type="button" className="btn ml-1" onClick={() => addToCart(product)}>
                    <BsFillCartPlusFill />
            </button>
        </>
    );
}

export default Count
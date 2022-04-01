import { useRouter } from "next/router";
import { useState } from "react";
import { AiOutlinePlus } from 'react-icons/ai';
import { AiOutlineMinus } from 'react-icons/ai';
import { BsFillCartPlusFill } from 'react-icons/bs';
import { useCartContext } from "../contexts/cartContext";

const Count = ({product,setAlert}) => {
    const {quantity,id} = product;
    const [count,setCount] = useState(1);
    const {addToCart} = useCartContext();
    const router = useRouter();

    const add = () => {
        setAlert({type: 'success', message: 'product added', show: true});
        addToCart(product,count);
    }
    const increase = () => {
        if(count < quantity)
            setCount(count + 1);
    }
    const decrease = () => {
        if(count > 1)
            setCount(count - 1);
    }
    return(
        <>
            <section className="count">
                <button type="button" onClick={decrease}>
                    <AiOutlineMinus />
                </button>
                <h3>{count}</h3>
                <button type="button" onClick={increase}>
                    <AiOutlinePlus />
                </button>
            </section>
            <button type="button" className="btn" onClick={() => {
                addToCart(product,count);
                router.push('/checkout');
            }}>
                proceed checkout
            </button>
            <button type="button" className="btn ml-1" onClick={add}>
                    <BsFillCartPlusFill />
            </button>
        </>
    );
}

export default Count
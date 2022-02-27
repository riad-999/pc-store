import { useCartContext } from "../contexts/cartContext";

const ShowBill = () => {
    const {shippingFee, totalAmount} = useCartContext();
    return (
        <div className='mb-2'>
            <div>
                <span className='fixed-w'>
                    Subtotal:
                </span>
                <span className="green">${(totalAmount - shippingFee) / 100}</span>
            </div>
            <div>
                <span className='fixed-w'>
                    Shipping fee:
                </span>
                <span className="green">${shippingFee / 100}</span>
            </div>
            <div className='mb-1'>
                <span className='fixed-w'>
                    total:
                </span>
                <span className="green">${totalAmount / 100}</span>
            </div>
        </div>
    );
}

export default ShowBill;
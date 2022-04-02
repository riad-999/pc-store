import { request } from "../utils";
import { useState} from "react";
import { checkAddressUrl } from "../utils/constants";
import { UseUIContext } from "../contexts/UIConttext";
import { Loading } from ".";
import { isOnServer } from "../utils/helpers";
import { useCartContext } from "../contexts/cartContext";
import { BiErrorCircle } from "react-icons/bi";

const AddressForm = ({setValidAddress,addr,setAddr}) => {
    const {setError, user} = UseUIContext();
    const {cart} = useCartContext();
    const [error,setErr] = useState({});
    const [loading,setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErr({});
        setLoading(true);
        if(!cart.length){
            setError({
                type: 'empty cart',
                message: 'your cart is empty, add pordcut(s) to cart to continue'
            });
        }
        const {success,response} = await request(checkAddressUrl,'post',addr);

        if(!response){
            setError({
                type: 'network',
                message: 'network error, refresh the page or try later'
            });
        }
        if(success){
            // proceed to checkout
            setValidAddress(true);
        }
        else {
            setErr({...response.data.errors});            
        }
        setLoading(false);
    }
    const handleChange = (e) => {
        const name = e.currentTarget.name;
        const value = e.currentTarget.value;
        setAddr({...addr,[name]: value});
    }
    if(!cart.length){
        return (
            <main className="main-content mt-5 center">
                <h2><BiErrorCircle /></h2>
                <h4>your cart is empty</h4>
            </main>
        );
    }
    return (
        <form onSubmit={handleSubmit} className="form">
            <h4 className="center">delivery address</h4>
            <div className="form__row">
                <label htmlFor="adress" className="form__label">address:</label>
                <input id="address" type="text" className="form__input" placeholder="542 w.15th Street" 
                name="address" value={addr.address} onChange={handleChange} />
                {
                error.address && 
                error.address.map((error,index) => <small className="small--red block" key={index}>{error}</small>)
                }
            </div>

            <div className="form__row--2-col">
                <div className="form__row child-60">
                    <label className="form__label" htmlFor="state">state:</label>
                    <input id="state" type="text" className="form__input" placeholder="algiers" 
                    name="state" value={addr.state} onChange={handleChange} />
                    {
                    error.state && 
                    error.state.map((error,index) => <small className="small--red block" key={index}>{error}</small>)
                    }
                </div>

                <div className="form__row child-40">
                    <label htmlFor="zip" className="form__label">zip code:</label>
                    <input id="zip" type="text" className="form__input" placeholder="16000" 
                    name="zip" value={addr.zip} onChange={handleChange} />
                    {
                        error.zip && 
                        error.zip.map((error,index) => <small className="small--red block" key={index}>{error}</small>)
                    }
                </div>
            </div>

            <button type="submit" className="btn btn--center btn--big mt-2">
                {
                    loading ? <Loading className="loading--small" /> : 'Next'
                }
            </button>
        </form>
    );
}

export default AddressForm;
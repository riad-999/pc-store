import {TableProductHeader,Layout,Loading, Feedback } from "../../components";
import Image from 'next/image';
import { imagesUrl, ordersUrl, productReviewUrl} from "../../utils/constants";
import {useRouter} from 'next/router';
import { request } from "../../utils";
import {useEffect, useState} from 'react';
import { handleFailure, toPrice } from "../../utils/helpers";
import axios from "axios";
import {FaTimes} from 'react-icons/fa';
import {AiFillStar} from 'react-icons/ai';

const Order = () => {
    const router = useRouter();
    const [order,setOrder] = useState(null);
    const [loading,setLoading] = useState(true);
    const [score,setScore] = useState(1);
    const [comment,setComment] = useState('');
    const [hide,setHide] = useState(true);
    const [currentElement,setCurrentElement] = useState(null);
    const [feedbackLoading,setFeedbackLoading] = useState(false);
    const [id,setId] = useState(null);

    const toggle = () => {
        setHide(!hide);
    }
    const feedback = (e,id) => {
        toggle();
        setComment('');
        setScore(1);
        setCurrentElement(e.currentTarget);
        setId(id);
    }
    const handleSubmit = async (e) => {
        setFeedbackLoading(true);
        e.preventDefault();
        const {success,response} = await request(`${productReviewUrl}/${id}`,'post',{score,comment});
        if(!success) {
            handleFailure(response,null,router);
        }
        else {
            currentElement.remove();
        }
        setFeedbackLoading(false);
        setHide(true);
    }
    const getOrder = async (id) => {
        try {
            const response = await axios.get(`${ordersUrl}/${id}`,{
                headers: {Accept: 'application/json'},
                withCredentials: true
            });
            setOrder(response.data);
        } catch (error) {
            handleFailure(error.response,null,router);
        }
        setLoading(false);
    }

    useEffect(() => {
        if(router.isReady)
            getOrder(router.query.id);
    },[router.isReady]);
    const {name,phone,address,state,zip} = order ? order.user : {};

    return (
        <Layout auth={true}>
            <main className="main-content typical-flex">
                {loading ? <Loading /> : 
                <>
                <form onSubmit={handleSubmit} className={hide ? "review_ form hide" : "review_ form"}>
                    <div className="remove" onClick={() => setHide(true)}><FaTimes /></div>
                    <div className="form__row">
                        <label className="form__label">score: </label>
                        <select value={score} onChange={(e) => setScore(e.currentTarget.value)}>
                            {
                                [1,2,3,4,5].map(item => <option key={item} value={item}>{item}</option>)
                            }
                        </select>
                    </div>
                    <div className="form__row">
                        <label className="form__label">comment: </label>
                        <textarea className="form__textarea" value={comment} onChange={(e) => setComment(e.currentTarget.value)} placeholder="your feedback ..."></textarea>
                    </div>
                    <button type="submit" className="btn">
                        {feedbackLoading ? <Loading className='loading--small' /> : 'submit'}
                    </button>
                </form>
                <section className="products-table"> 
                    <h4>ordered products</h4>
                    <TableProductHeader image={true}/>
                    {
                        order.products.map(product => {
                            const {id,name,quantity,images,price,review} = product;
                            return (
                                <article className="grid-3" key={id}>
                                    <div className="img__container">
                                        <Image src={`${imagesUrl}/${images.main}`} objectFit="cover" layout="fill" />
                                    </div>
                                    <div>{name}</div>
                                    <div>{quantity}x <span className="green">${toPrice(price)}</span>
                                        {/* <small className="ml-1 btn" 
                                        onClick={ review ? null : (e) => feedback(e,id)}>
                                            {review ? <>{review} <AiFillStar /> </> : 'feedback'}
                                        </small> */}
                                        <small className="ml-1 btn" 
                                        onClick={(e) => feedback(e,id)}>
                                            {review ? <>{review} <AiFillStar /> </> : 'feedback'}
                                        </small>
                                    </div>
                                </article>
                            );
                        })
                    }
                </section>
                <section className="buyer-address">
                    <h4>info</h4>
                    <section>
                        <div><span className="w-110p green">full name: </span>{name}</div>
                        <div className="mt-1"><span className="w-110p green">phone: </span>{phone}</div>
                        <div className="mt-1"><span className="w-110p green">address: </span>{address}</div>
                        <div className="mt-1"><span className="w-110p green">state, zip: </span>{state}, {zip}</div>
                    </section>
                </section>
                </>
                }
            </main>
        </Layout>
    );
}

export default Order;
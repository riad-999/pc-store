import { TableProduct,TableProductHeader,Layout,Loading,Error } from "../../components";
import { ordersUrl, orderDeliverUrl } from "../../utils/constants";
import { request } from "../../utils";
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import axios from "axios";

const Order = () => {
    const router = useRouter();
    const [order,setOrder] = useState(null);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState('');
    const [deliverLoading,setDeliverLoading] = useState(false);
    const [delivered,setDelivered] = useState(null);

    const handleFailure = (response) => {
        if(!response) {
            setError('network error');
        } 
        else {
            if(response.status === 401) {
                setError('session exipred, you need to login as admin');
            }
            else {
                console.log(response);
                setError('unexpected error occured');
            }
        }
    }
    const handleDelivered = async () => {
        const id = router.query.id;
        const state = delivered ? 'delivered' : 'undelivered';
        setDeliverLoading(true);
        const {success, response} = await request(`${orderDeliverUrl}/${id}?state=${state}`,'put');
        if(!success) {
            handleFailure(response);
        }
        else {
            setDelivered(!delivered);
        }
        setDeliverLoading(false);
    }
    const getOrder = async (id) => {
        try {
            const response = await axios.get(`${ordersUrl}/${id}`,{
                headers: {Accept: 'application/json'},
                withCredentials: true
            });
            setOrder(response.data);
            setDelivered(response.data.exported);
        } catch (error) {
            handleFailure(error.response);
        }
        setLoading(false);
    }

    useEffect(() => {
        if(router.isReady)
            getOrder(router.query.id);
    },[router.isReady]);
    const {name,phone,address,state,zip} = order ? order.user : {};

    if(error) {
        return (
            <Error message={error} />
        );
    }
    return (
        <Layout admin={true}>
            <main className="main-content typical-flex">
                {loading ? <Loading /> : 
                <>
                <section className="products-table"> 
                    <h4>ordered products</h4>
                    <TableProductHeader />
                    {
                        order.products.map(product => {
                            return (
                                <TableProduct key={product.id} {...product}/>
                            );
                        })
                    }
                </section>
                <section className="buyer-address">
                    <h4>buyer info</h4>
                    <section>
                        <div><span className="w-110p green">full name: </span>{name}</div>
                        <div className="mt-1"><span className="w-110p green">phone: </span>{phone}</div>
                        <div className="mt-1"><span className="w-110p green">address: </span>{address}</div>
                        <div className="mt-1"><span className="w-110p green">state, zip: </span>{state}, {zip}</div>
                    </section>
                    <button type="button" className="btn mt-2" onClick={handleDelivered}>
                        {deliverLoading ? <Loading className="loading--small" /> : 
                        delivered ? 'unmark' : 'mark as delivered'}
                    </button>
                </section>
                </>
                }
            </main>
        </Layout>
    );
}

export default Order;
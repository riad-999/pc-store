import { Layout, Error } from "../../components";
import { TableOrder, OrderTableHeader } from "../../components";
import { request } from "../../utils";
import { ordersUrl } from "../../utils/constants";
import { useState,useEffect } from "react";
import { handleFailure } from "../../utils/helpers";
import { Loading } from "../../components";

const Orders = () => {
    const [loading,setLoading] = useState(true);
    const [orders,setOrders] = useState([]);
    const [error,setError] = useState(null);

    const getORders = async () => {
        const {success,response} = await request(ordersUrl);
        if(!success) {
            handleFailure(response,setError);
        }
        else {
            setOrders(response.data.orders);
        }
        setLoading(false);
    }

    useEffect(() => {
        getORders();
    },[]);

    if(error) {
        return (
            <Error message={error} />
        );
    }
    return (
        <Layout>
            <main className="main-content">
                {loading ? <Loading /> : 
                <section className="orders-table">
                    <OrderTableHeader />
                    {
                        orders.map(order => <TableOrder key={order.id} {...order}/>)
                    }
                </section>
                }
            </main>
        </Layout>
    );
}

export default Orders;
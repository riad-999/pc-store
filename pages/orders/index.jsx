import { Layout } from "../../components";
import { TableOrder, OrderTableHeader } from "../../components";
import { ordersUrl } from "../../utils/constants";
import { useFetch } from "../../utils";
import { Loading } from "../../components";

const Orders = () => {
    const {loading,data,error} = useFetch(ordersUrl);
    if(loading){
        return (
            <Layout>
                <Loading />
            </Layout>
        );
    }
    if(error) {
        return (
            <Error message={error.message} />
        );
    }
    return (
        <Layout>
            <main className="main-content">
                <section className="orders-table">
                    <OrderTableHeader />
                    {
                        data.data.orders.map(order => <TableOrder key={order.id} {...order}/>)
                    }
                </section>
            </main>
        </Layout>
    );
}

export default Orders;
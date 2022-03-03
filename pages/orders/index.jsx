import { Layout } from "../../components";
import { TableOrder, OrderTableHeader } from "../../components";

const Orders = () => {
    return (
        <Layout>
            <main className="main-content">
                <section className="orders-table">
                    <OrderTableHeader />
                    <TableOrder />
                    <TableOrder />
                    <TableOrder />
                </section>
            </main>
        </Layout>
    );
}

export default Orders;
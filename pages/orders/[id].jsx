import { TableProduct,TableProductHeader,Layout } from "../../components";

const Order = () => {
    return (
        <Layout>
            <main className="main-content typical-flex">
                <section className="products-table">
                    <h4>ordered products</h4>
                    <TableProductHeader />
                    <TableProduct />
                    <TableProduct />
                    <TableProduct />
                </section>
                <section className="buyer-address">
                    <h4>buyer info</h4>
                    <section>
                        <div>full name: felih riad</div>
                        <div>total: $900</div>
                        <div>address: cite 49 logs bt2 n8</div>
                        <div>alger, 16064</div>
                    </section>
                </section>
            </main>
        </Layout>
    );
}

export default Order;
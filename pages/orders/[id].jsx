import { TableProduct,TableProductHeader,Layout,Loading,Error } from "../../components";
import { useFetch } from "../../utils";
import { ordersUrl } from "../../utils/constants";
import {useRouter} from 'next/router';

const Order = () => {
    const router = useRouter();
    const {id} = router.query;
    const {loading,data,error} = useFetch(`${ordersUrl}/${id}`);
    if(loading){
        return (
            <Loading />
        );
    }
    if(error) {
        return (
            <Error message={error.message} />
        );
    }
    const {name,phone,address,state,zip} = data.data.user;
    return (
        <Layout>
            <main className="main-content typical-flex">
                <section className="products-table">
                    <h4>ordered products</h4>
                    <TableProductHeader />
                    {
                        data.data.products.map(product => {
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
                </section>
            </main>
        </Layout>
    );
}

export default Order;
import { Layout, Loading } from "../../components";
import {useState,useEffect} from 'react';
import { handleFailure } from "../../utils/helpers";
import { userOrdersUrl } from "../../utils/constants";
import { request } from "../../utils";
import Link from 'next/link';
import {useRouter} from 'next/router';

const Account = () => {
    const router = useRouter(); 
    const [loading,setLoading] = useState(true);
    const [data,setData] = useState(null);

    const getData = async () => {
        const {success,response} = await request(userOrdersUrl);
        if(!success) {
            handleFailure(response,null,router);
        }
        else {
            console.log(response.data);
            setData(response.data);
        }
        setLoading(false);
    };

    useEffect(() => {
        getData();
    },[]);
    return (
        <Layout auth={true}>
            <main className="main-content">
                <h4>Order history</h4>
                {  
                    loading ? <Loading /> :
                    !data.orders.length ? <h4 className="center">empty history</h4> :
                    <>
                    <header className="grid-4 myorder__header">
                        <div>date</div>
                        <div>total</div>
                        <div>shippment fee</div>
                        <div></div>
                    </header>
                    <section>
                        { 
                            data.orders.map(order => {
                                const {created_at,id,total,shippment_fee} = order;
                                return (
                                    <article key={id} className="grid-4 myorder">
                                        <div>{created_at.substring(0,10)}</div>
                                        <div>{total}</div>
                                        <div>{shippment_fee}</div>
                                        <button className="btn">
                                            <Link href={`/account/${id}`}><a>details</a></Link>
                                        </button>
                                    </article>
                                )
                            })
                        }
                    </section>
                    </>
                }
            </main>
        </Layout>
    );
}

export default Account;
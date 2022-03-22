import Link from "next/link";
import {useState} from 'react';
import { orderDeliverUrl } from "../utils/constants";
import Loading from "./loading";

const TableOrder = (props) => {
    const {buyer,id} = props;
    const [loading,setLoading] = useState(false);
    const deliver = async () => {
        setLoading(true);

        
    }
    return (
        <article className="order-table__order">
            <div className="green">{id}</div>
            <div>{buyer}</div>
            <div>
                <button type="button" className="btn">
                    <Link href={`/orders/${id}`}><a>details</a></Link>
                </button>
            </div>
        </article>
    );
}

export default TableOrder;
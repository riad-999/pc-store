import Link from "next/link";

const TableOrder = (props) => {
    const {buyer,id,phone} = props;
    return (
        <article className="order-table__order">
            <div className="green">{id}</div>
            <div>{buyer}</div>
            <div>{phone}</div>
            <button type="button" className="btn">
                <Link href={`/orders/${id}`}><a>details</a></Link>
            </button>
        </article>
    );
}

export default TableOrder;
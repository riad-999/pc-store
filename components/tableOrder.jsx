import Link from "next/link";

const TableOrder = () => {
    return (
        <article className="order-table__order">
            <div className="green">125</div>
            <div>felih riad</div>
            <div>792193814</div>
            <button type="button" className="btn">
                <Link href="/orders/125"><a>details</a></Link>
            </button>
        </article>
    );
}

export default TableOrder;
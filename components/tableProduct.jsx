const TableProduct = (props) => {
    const {id,name,quantity} = props;
    return (
        <article className="table-product">
            <div className="green">{id}</div>
            <div>{name}</div>
            <div>{quantity}</div>
        </article>
    );
}

export default TableProduct;
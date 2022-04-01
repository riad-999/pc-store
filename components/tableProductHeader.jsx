const TableProductHeader = ({image}) => {
    return (
        <article className="table-product__header">
            <div>{image ? "image" : "id" }</div>
            <div>name</div>
            <div>quantity</div>
        </article>
    );
}

export default TableProductHeader;
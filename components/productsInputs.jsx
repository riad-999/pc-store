const ProductInputs = (props) => {
    const {handleChange, product, errors} = props;
    const categories = ['cpu','graphics card','disks','ram','cpu cooler','psu','case','motherboard','peripheral'];

    return (
        <section className="product-inputs">
            <div className="form__row">
                <label className="form__label" htmlFor="name">
                    name:
                </label>
                <input type="text" className="form__input" onChange={handleChange} 
                value={product.name} placeholder="product" name="name" id="name" />
                {
                errors.name && 
                errors.name.map((error,index) => <small className="small--red block" key={index}>{error}</small>)
                }
            </div>

            <div className="form__row">
                <label className="form__label" htmlFor="price">
                    price (in centes):
                </label>
                <input type="number" className="form__input" onChange={handleChange} 
                value={product.price} placeholder="centes" name="price" id="price" />
                {
                errors.price && 
                errors.price.map((error,index) => <small className="small--red block" key={index}>{error}</small>)
                }
            </div>
            
            <div className="form__row">
                <label className="form__label" htmlFor="category">
                    category:
                </label>
                <select name="category" className="form__input" value={product.category} onChange={handleChange}>
                    {
                        categories.map(
                            (category,index) => <option value={category} key={index}>{category}</option>
                        )
                    }
                </select>
                {
                errors.category && 
                errors.category.map((error,index) => <small className="small--red block" key={index}>{error}</small>)
                }
            </div>

            <div className="form__row">
                <label className="form__label" htmlFor="quantity">
                    quanity :
                </label>
                <input type="number" className="form__input" onChange={handleChange} 
                value={product.quantity} placeholder="100" name="quantity" id="quantity" />
                {
                errors.quantity && 
                errors.quantity.map((error,index) => <small className="small--red block" key={index}>{error}</small>)
                }
            </div>

            <div className="form__row">
                <span className="white">featured :</span>
                <input type="checkbox" checked={product.featured} className="ml-1 pointer" onChange={handleChange} 
                 placeholder="100" name="featured" id="featured" />
                <br />
                {
                errors.featured && 
                errors.featured.map((error,index) => <small className="small--red block" key={index}>{error}</small>)
                }
            </div>

            <div className="form__row">
                <label className="form__label" htmlFor="description">
                    description :
                </label>
                <textarea type="number" className="form__input" onChange={handleChange} 
                value={product.description} placeholder="..." name="description" id="description"></textarea>
                {
                errors.description && 
                errors.description.map((error,index) => <small className="small--red block" key={index}>{error}</small>)
                }
            </div>
        </section>
    );
}

export default ProductInputs;
import { BiSearch } from 'react-icons/bi';
import { AiOutlineArrowDown } from 'react-icons/ai';
import { useFilterContext } from '../contexts/filterContext';
import { toPrice } from '../utils/helpers';

const MainFilters = () => {
    const {setSort,products,clearFilters,changeFilters,filters,filters: {price,maxPrice,minPrice}} = useFilterContext();
    const set = new Set(products.map(products => products.category));
    const categories = [...set];
    return (
        <section className="main-filters">
            <form className="search">
                <input type="search" name="search" placeholder="Search" className="search__input" />
                <button className="btn btn--transp" type="submit">
                    <BiSearch />
                </button>
                <button className="btn ml-1" type="button">
                    <AiOutlineArrowDown />
                </button>
            </form>
            <section className="sub-filters">
                <div className='categories'>
                    <h4>Categories</h4>
                    <button type="button" className={filters.category === 'all' ? `category btn btn--transp selected` : `category btn btn--transp`}
                     onClick={() => changeFilters('category','all')}>
                        All
                    </button>
                    {   
                        categories.map((category,index) => {
                            const currentCategory = filters.category;
                            console.log(currentCategory);
                            return (
                            <button key={index} type="button" className={currentCategory === category ? `category btn btn--transp selected` : `category btn btn--transp`}
                             onClick={() => changeFilters('category',category)}>
                                {category}
                            </button>
                        );
                        })
                    }
                </div>
                <div className='2nd-filters'>
                    <div className='form__row'>
                        <label htmlFor="companies" className='form__label'>
                            companies:
                        </label>
                        <select id="companies">
                            <option>All</option>
                            <option>MSI</option>
                            <option>Asus</option>
                            <option>Adata</option>
                            <option>logitech</option>
                        </select>
                    </div>
                    <div className='input__row'>
                        <label className='form__label' htmlFor="price">
                            Price:
                        </label>
                        <div className='current-price'>${toPrice(price)}</div>
                        <input type="range" step='4000' value={price} max={maxPrice} min={minPrice} 
                        onChange={event => changeFilters('price',event.currentTarget.value)}/>
                    </div>
                    <div className='form__row'>
                        <label htmlFor="shippment" className='form__label'>
                            free shipping: <input type="checkbox" className='ml-1' id="shippment"/>
                        </label>
                    </div>
                </div>
                <div className='3rd-filters'>
                    <div className='form__row'>
                        <label htmlFor='sort' className='form__label'>
                            sort by:
                        </label>
                        <select onChange={event => setSort(event.currentTarget.value)}>
                            <option value="score">score</option>
                            <option value="asc-price">ascending (price)</option>
                            <option value="desc-price">decending (price)</option>
                            <option value="A-Z">from A-Z</option>
                            <option value="Z-A">from Z-A</option>
                        </select>
                    </div>
                    <button type="button" className='btn btn--red mt-2' onClick={clearFilters}>
                        reset filters
                    </button>
                </div>
            </section>
        </section>
    );
}

export default MainFilters;
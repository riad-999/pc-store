import { AiOutlineArrowUp, AiOutlineArrowDown } from 'react-icons/ai';
import { useFilterContext } from '../contexts/filterContext';
import { toPrice } from '../utils/helpers';
import { useState } from 'react';

const MainFilters = () => {
    const [arrowUp,setArrowUp] = useState(true);
    const [show,setShow] = useState(true);
    const {setSort,products,clearFilters,changeFilters,sort,filters,filters: {search,price,maxPrice,minPrice}} = useFilterContext();
    const set = new Set(products.map(products => products.category));
    const categories = [...set];

    const toggleArrow = () => {
        setArrowUp(!arrowUp);
        setShow(!show);
    }

    return (
        <section className="main-filters">
            <form className="search" onSubmit={e => e.preventDefault()}>
                <input type="search" name="search" placeholder="Search" 
                className="search__input" value={search} onChange={e => changeFilters('search',e.currentTarget.value)}/>
                <button className="btn ml-1" type="button" onClick={toggleArrow}>
                    {
                        arrowUp ? <AiOutlineArrowUp /> : <AiOutlineArrowDown />
                    }
                </button> 
            </form>
            <section className={show ? 'sub-filters' : 'sub-filters no-height'}>
                <div className='categories'>
                    <h4>Categories</h4>
                    <button type="button" className={filters.category === 'all' ? `category btn btn--transp selected` : `category btn btn--transp`}
                     onClick={() => changeFilters('category','all')}>
                        All
                    </button>
                    {   
                        categories.map((category,index) => {
                            const currentCategory = filters.category;
                            if(!category)
                                return null;
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
                    
                    <div className='input__row'>
                        <label className='form__label' htmlFor="price">
                            Price:
                        </label>
                        <div className='current-price'>${toPrice(price)}</div>
                        <input type="range" step='4000' value={price} max={maxPrice} min={minPrice} 
                        onChange={event => changeFilters('price',event.currentTarget.value)}/>
                    </div>
                    
                    <div className='form__row'>
                        <label htmlFor='sort' className='form__label'>
                            sort by:
                        </label>
                        <select onChange={event => setSort(event.currentTarget.value)}>
                            <option value="score" selected={"score" === sort}>score</option>
                            <option value="asc-price" selected={"asc-price" === sort}>ascending (price)</option>
                            <option value="desc-price" selected={"desc-price" === sort}>decending (price)</option>
                            <option value="A-Z" selected={"A-Z" === sort}>from A-Z</option>
                            <option value="Z-A" selected={"Z-A" === sort}>from Z-A</option>
                        </select>
                    </div>

                    <button type="button" className='btn btn--red mt-2' onClick={clearFilters}>
                        reset filters
                    </button>
                </div>
                {/* <div className='3rd-filters'>
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
                </div> */}
            </section>
        </section>
    );
}

export default MainFilters;
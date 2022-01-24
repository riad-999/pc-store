import { BiSearch } from 'react-icons/bi';
import { AiOutlineArrowDown } from 'react-icons/ai';

const MainFilters = () => {
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
                    <button type="button" className='category selected btn btn--transp'>
                        All
                    </button>
                    <button type="button" className='category btn btn--transp'>
                        cpu
                    </button>
                    <button type="button" className='category btn btn--transp'>
                        graphics card
                    </button>
                    <button type="button" className='category btn btn--transp'>
                        pereferals
                    </button>
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
                        <div className='current-price'>$399</div>
                        <input type="range" id="price"/>
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
                        <select id="sort">
                            <option>ascending (price)</option>
                            <option>decending (price)</option>
                            <option>from A-Z</option>
                            <option>from Z-A</option>
                        </select>
                    </div>
                    <button type="button" className='btn btn--red mt-2'>
                        reset filters
                    </button>
                </div>
            </section>
        </section>
    );
}

export default MainFilters;
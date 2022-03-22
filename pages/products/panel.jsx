import { PanelProduct, Layout, Error, Loading } from '../../components';
import { useEffect, useState } from 'react';
import {allProductsUrl} from '../../utils/constants';
import axios from 'axios';
import { UseUIContext } from '../../contexts/UIConttext';

const Panel = () => {
    // states 
    const [search,setSearch] = useState('');
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState('');
    const [products,setProducts] = useState([]);
    const {isAdmin} = UseUIContext();
    const [filteredProducts,setFilteredProducts] = useState([]);
    // handlers
    const handleChange = (e) => {
        setSearch(e.currentTarget.value);
    };
    // utils 
    const handleFailure = (response) => {
        if(response) {
            console.log(response);
            if(response.status === 401) {
                setError('session expired, you need to login as admin');
            }
            else {
                setError('unexpected error occured');
            }
        }
        else {
            setError('network error, refresh the page or try later');
        }
    }
    const getProducts = async () => {
        try {   
            const response = await axios.get(allProductsUrl,{
                headers: {Accept: 'application/json'},
                withCredentials: true
            });
            const products = response.data.data;
            setProducts(products);
            setFilteredProducts(products);
        } catch(error) {
            handleFailure(error);
        }
        setLoading(false);
    }
    // use effects
    useEffect(() => {
        if(isAdmin === true)
            getProducts();
    },[isAdmin]);
    useEffect(() => {
        const matches = products.filter(product => product.name.includes(search));
        setFilteredProducts(matches);
    },[search]);

    if(error){
        return (
            <Error message={error} />
        );
    }
    return (
        <Layout admin={true}>
            <main className='main-content'>
                <h3>update products</h3>
                <form className="search" onSubmit={e => e.preventDefault()}>
                    <input type="search" name="search" placeholder="Search" 
                    className="search__input" value={search} onChange={handleChange} />
                </form>
                <section>
                    <section className='panel-header'>
                        <div>id</div> 
                        <div className='name'>name</div>
                        <div></div>
                    </section>
                    <section>
                        {
                            loading ? <Loading /> : 
                            <>
                                {   filteredProducts.length ?
                                    filteredProducts.map(product => {
                                        return (
                                            <PanelProduct handleFailure={handleFailure} key={product.id} product={product} />
                                        );
                                    }) 
                                    : 
                                    <h4 className='center'>no matching products for your search</h4>
                                }
                            </>
                        }
                    </section>
                </section>
            </main>
        </Layout>
    );
}

export default Panel;
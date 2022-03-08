import {useState, useEffect} from 'react';
import { Layout,Error,ProductInputs, Loading } from "../../components";
import { UseUIContext } from "../../contexts/UIConttext";
import { request } from "../../utils";

const Create = () => {
    const initProductState = {
        name: '',
        price: '',
        quantity: '',
        featured: false,
        description: ''
    };
    const errorsInitSate = {
        ...initProductState
    };
    // global states
    const {isAuth} = UseUIContext();
    // states
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(null);
    const [inputsError,setInputsError] = useState(errorsInitSate);
    const [productInputs,setProductInputs] = useState(initProductState);
    // handlers
    const handleChange = (e) => {
        const name = e.currentTarget.name;
        let value = e.currentTarget.value;
        if(name === 'featured'){
            value = e.currentTarget.checked;
        }
        setProductInputs({...productInputs,[name]: value});
    };
    const handleSubmit = (e) => {
        e.currentTarget.preventDefault();
    };
    // useEffects
    // useEffect(() => {
    //     if(isAuth === false){
    //         setError('you need to login as admin');
    //     }
    // },isAuth);

    if(isAuth === null){
        return (
            <Layout>
                <Loading />
            </Layout>
        );
    }

    if(error){
        return (
            <Error message={error} />
        );
    }

    return (
        <Layout>
            <main className="main-content">
                <form className="product-form form" onSubmit={handleSubmit}>
                    <h3 className='center'>create a product</h3>
                    <ProductInputs handleChange={handleChange} 
                    errors={inputsError} product={productInputs}/>   

                    <button type="submit" className="btn btn--center btn--big mt-2">
                        create
                    </button>
                </form>
            </main>
        </Layout>
    );
}

export default Create;
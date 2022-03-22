import {useState, useRef, useEffect} from 'react';
import { Layout,Error,ProductInputs, Loading } from "../../../components";
import { request } from "../../../utils";
import {useRouter} from 'next/router';
import { UseUIContext } from '../../../contexts/UIConttext';
import { storeSessionUrl, imagesUrl, productsUrl, updateProductUrl } from '../../../utils/constants';
import axios from 'axios';

const Edit = () => {
    const initProductState = {
        name: '',
        price: '',
        quantity: '',
        featured: false,
        category: 'cpu',
        description: '',
        mainImage: null,
        otherImages: null
    };
    const errorsInitSate = {
        ...initProductState,
        category: null
    };
    const {isAdmin} = UseUIContext();
    const router = useRouter();
    // states
    const [message,setMessage] = useState(null);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(null);
    const [inputsError,setInputsError] = useState(errorsInitSate);
    const [productInputs,setProductInputs] = useState(initProductState);
    // refs 
    const mainImage = useRef(null);
    const otherImages = useRef([]);
    const addRef = (el) => {
        if(el && !otherImages.current.includes(el))
            otherImages.current.push(el);
    }
    // handlers
    const handleChange = (e) => {
        const name = e.currentTarget.name;
        let value = e.currentTarget.value;
        if(name === 'featured'){
            value = e.currentTarget.checked;
        }
        setProductInputs({...productInputs,[name]: value});
    };
    const handlefileChange = (e) => {
        const name = e.currentTarget.name;
        setProductInputs({
            ...productInputs,[name]: e.currentTarget.files
        });
        if(name === 'mainImage') {
            const reader = new FileReader();
            reader.onloadend = () => {
                mainImage.current.src = reader.result;
            }
            reader.readAsDataURL(e.currentTarget.files[0]);
        }
        if(name === 'otherImages') {
            [...Array(3).keys()].forEach((i) => {
                otherImages.current[i].src = '';
                if(e.currentTarget.files[i]) {
                    const reader = new FileReader();
                    reader.onload = () => {
                        otherImages.current[i].src = reader.result;
                    }
                    reader.readAsDataURL(e.currentTarget.files[i]);
                }
            });
        }
    }
    const handleFailure = (response) => {
        if(response) {
            console.log(response);
            if(response.status === 422) {
                setInputsError({...response.data.errors});
            }
            if(response.status === 401) {
                setError('session expired, you need to login as admin');
            }
            if(response.status != 401 && response.status != 422) {
                setMessage({type: 'red', content: 'unexpected error occured'});
            }
        }
        else {
            setError('network error, refresh the page or try later');
        }
    }
    const handleSubmit = async (e) => {
        console.log(productInputs);
        e.preventDefault();
        setLoading(true);
        setMessage(null);
        setInputsError({...errorsInitSate});
        const formData = new FormData();
        if(productInputs.mainImage) {
            formData.append('main',productInputs.mainImage[0]);
        }
        if(productInputs.otherImages){
            let i = null;
            for (i=0;i<3;i++) {
                if(!productInputs.otherImages || !productInputs.otherImages[i])
                    break;
                formData.append(`other${i}`,productInputs.otherImages[i]);
            }
        }
        const {success,response} = await request(storeSessionUrl,'post',productInputs);
        if(success) {
            const id = router.query.id;
            const {success: succ,response: res} = await request(`${updateProductUrl}/${id}`,'put',formData);
            if(succ) {
                setMessage({type: 'green', content: 'product updated'});
            }
            else {
                if(res && res.status === 422) {
                    setMessage({type: 'red', content: 'make sure to select a valid image, and it should be less than 4MB'});
                }
                else {
                    handleFailure(res);
                }        
            }
        }
        else {
            handleFailure(response);
        }
        setLoading(false);
    };
    // utils 
    const getProduct = async () => {
        setLoading(true);
        const {id} = router.query;
        try {   
            const response = await axios.get(`${productsUrl}/${id}`,{
                headers: {Accept: 'application/json'},
                withCredentials: true
            });
            const product = response.data.data;
            const {name,category,price,quantity,description,featured,images} = product;
            setProductInputs({
                name,category,description,quantity,price,featured,mainImage: {},otherImages: {}
            });
            mainImage.current.src = `${imagesUrl}/${product.images.main}`;
            images.others.forEach((image,index) => {
                otherImages.current[index].src = `${imagesUrl}/${image}`; 
            });
        } catch(error) {
            handleFailure(error);
        }
        setLoading(false);
    }
    // useEffects 
    useEffect(() => {
        if(router.isReady && isAdmin === true) {
            getProduct();
        }
    },[router.isReady,isAdmin]);

    if(error){
        return (
            <Error message={error} />
        );
    }

    return (
        <Layout admin={true}>
            <main className="main-content">
                <form className="product-form form" onSubmit={handleSubmit}>
                    <h3 className='center'>update product</h3>
                    <ProductInputs handleChange={handleChange} 
                    errors={inputsError} product={productInputs}/>   

                    <div className='form__row'>
                        <label className='form__label' htmlFor='main'>main product image</label>
                        <input type="file" name="mainImage" className='form__input' onChange={handlefileChange} />
                        <img ref={mainImage} src='' alt="product image" 
                        className={productInputs.mainImage ? 'form-product-image' : 'none'} />
                    </div>

                    <div className='form__row'>
                        <label className='form__label' htmlFor='otherImages'>extra images (optional)</label>
                        <input type="file" name="otherImages" className='form__input' onChange={handlefileChange} multiple/>
                        <div className={productInputs.otherImages ? 'other-images other-images--3' : 'none'}>
                            {
                                [...Array(3).keys()].map((i) => <img ref={addRef} key={i} alt="..." src=''/>)
                            }
                        </div>
                    </div>
                    {
                        message ? <div className={`center ${message.type}`}>{message.content}</div> : null
                    }
                    <button type="submit" className="btn btn--center btn--big mt-2">
                        {loading ? <Loading className='loading--small' /> : 'edit'}
                    </button>
                </form>
            </main>
        </Layout>
    );
}

export default Edit;
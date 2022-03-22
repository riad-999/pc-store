import Link from 'next/link';
import { request } from '../utils';
import { archiveProductUrl } from '../utils/constants';
import {useState} from 'react';
import Loading from './loading';

const PanelProduct = ({product,handleFailure}) => {
    const {name,id,archived} = product;
    const [loading,setLoading] = useState(false);
    const [archive,setArchive] = useState(archived);

    const handleArchive = async () => {
        setLoading(true);
        const state = archive ? 'archived' : 'unarchived';
        const {success,response} = await request(`${archiveProductUrl}/${id}?state=${state}`,'put');
        setLoading(false);
        if(!success){
            handleFailure(response);
            return;
        }
        setArchive(!archive);
    }
    return (
        <article className="panel-product mb-2">
            <div className='green'>{id}</div>
            <div>{name}</div>
            <div className='btns'>
                <Link  href={`/products/edit/${id}`} passHref>
                    <button type="button" className='btn'>
                        <a>update</a>
                    </button>
                </Link>
                <button type="button" className="btn" onClick={handleArchive}>
                    {loading ? <Loading className='loading--small' /> : archive ? 'unarchive' : 'archive'}
                </button>
            </div>
        </article>
    );
}

export default PanelProduct;
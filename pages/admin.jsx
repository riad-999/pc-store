import {Layout} from '../components';
import {AiOutlinePlus} from 'react-icons/ai';
import {MdLocalShipping} from 'react-icons/md';
import {BiPencil} from 'react-icons/bi';
import Link from 'next/link';

const Admin = () => {
    return (
        <Layout admin={true}>
            <main className='main-content grid-2'>
                <article className='admin-card center'>
                    <h4 className='green'><AiOutlinePlus /></h4>
                    <h4>create new Products</h4>
                    <Link href="/products/create" passHref>
                        <button type="button" className='btn btn--center'>
                            <a>Create</a>
                        </button>
                    </Link>
                </article>
                <article className='admin-card center'>
                    <h4 className='green'><BiPencil /></h4>
                    <h4>update existing products</h4>
                    <Link href="/products/panel" passHref>
                        <button type="button" className='btn btn--center'>
                            <a>Update</a>
                        </button>
                    </Link>
                </article>
                <article className='admin-card center'>
                    <h4 className='green'><MdLocalShipping /></h4>
                    <h4>check orders</h4>
                    <Link href="/orders" passHref>
                        <button type="button" className='btn btn--center'>
                            <a>check</a>
                        </button>
                    </Link>
                </article>
            </main>
        </Layout>
    );
}

export default Admin;
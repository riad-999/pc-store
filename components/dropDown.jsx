import {Auth} from '.';
import {AiOutlineUser} from 'react-icons/ai';
import { UseUIContext } from '../contexts/UIConttext';
import Link from 'next/link';

const DropDown = () => {
    const {isAdmin} = UseUIContext();
    return (
        <div className='dropdown'>
            <AiOutlineUser className='text--big'/>
            <ul className='dropdown__list'>
                <li><Auth /></li>
                {isAdmin ? 
                <li><Link href="/admin"><a>administration</a></Link></li> : 
                <li><Link href="/account"><a>account</a></Link></li>
                }
            </ul>
        </div>
    );
}

export default DropDown;
import { FiUserCheck} from "react-icons/fi";
import { FiUserMinus } from "react-icons/fi";
import { UseUIContext } from "../contexts/UIConttext";
import { Loading } from ".";
import Link from "next/link";
import {useRouter} from 'next/router';
import {useState} from 'react';
import { request } from "../utils";
import { logoutUrl } from "../utils/constants";

const Auth = () => {
    const router = useRouter();
    const { isAuth, setIsAuth, setIsAdmin} = UseUIContext();
    const [loading,setLoading] = useState(false);

    const logout = async () => {
        setLoading(true);
        const {success} = await request(logoutUrl,'post');
        if(success) {
            setIsAuth(false);
            setIsAdmin(false);
        }
        else {
            router.push('/error');
        }
        setLoading(false);
        router.push('/');
    }
    if(loading || isAuth === null) {
        return (
            <button type="button" className="auth">
               <Loading className='loading--small' />
            </button>
        );
    }
    return (
        <button type="button" className="auth">
            {
            !isAuth ? 
            <Link href="/session/login"><a>Login <FiUserMinus /></a></Link> : 
            <button type="button" onClick={logout}>Logout<FiUserCheck /></button>
            }
        </button>
    );
}

export default Auth;
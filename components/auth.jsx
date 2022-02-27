import { FiUserCheck} from "react-icons/fi";
import { FiUserMinus } from "react-icons/fi";
import { UseUIContext } from "../contexts/UIConttext";
import { Loading } from ".";
import Link from "next/link";
import { useFetch } from "../utils";
import { authUrl } from "../utils/constants";
import { useEffect, useState } from "react";

const Auth = () => {
    const {logout, isAuth, setIsAuth, setUser} = UseUIContext();
    // const [isAuth,setIsAuth] = useState(null);
    const {loading,error,data} = useFetch(authUrl,'get');
    useEffect(() => {
        if(error){
            if(error.type === 'network') {
                //handle network error
            }
            else {
                if(error.response.status === 401) {
                    setIsAuth(false);
                }
            }
        } 
        if(data && data.status === 200) {
            setIsAuth(true);
            setUser(data.data);
        }
    },[data,error]);

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
            <span onClick={logout}>Logout <FiUserCheck /></span>
            }
        </button>
    );
}

export default Auth;
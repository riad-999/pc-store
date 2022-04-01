import { Error } from ".";
import { UseUIContext } from "../contexts/UIConttext";
import { Navbar, Sidebar, Loading } from ".";
import {useState, useEffect} from 'react';

const Layout = ({children, auth, admin}) => {
    const {error,isAuth,isAdmin} = UseUIContext();
    const [err,setErr] = useState(null);

    useEffect(() => {
        if(isAdmin === false && admin) {
            setErr(`session expired you need to login as admin`);
        }
        if(isAuth === false && auth) {
            setErr(`session expired you need to login`);
        }
    },[isAdmin,isAuth]);
    if(error) {
        return (
            <Error />
        );
    }
    if(err) {
        return (
            <Error message={err} />
        );
    }
    if(auth || admin) {
        if(isAdmin === null || isAuth === null) {
            return (
                <>
                    <Navbar />
                    <Sidebar />
                    <Loading />
                </>
            );
        }
    }
    return (
        <>
            <Navbar />
            <Sidebar />
            {children}
        </>
    );
}

export default Layout;
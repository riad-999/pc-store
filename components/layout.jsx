import { Error } from ".";
import { UseUIContext } from "../contexts/UIConttext";
import { Navbar, Sidebar, Loading } from ".";
import {useState, useEffect} from 'react';

const Layout = ({children, auth, admin}) => {
    const {error,isAuth,isAdmin} = UseUIContext();
    const [err,setErr] = useState(null);

    useEffect(() => {
        if(admin || auth) {
            if(isAdmin === false || isAuth === false) {
                setErr(`session expired you need to login ${admin ? 'as admin' : ''}`);
            }
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
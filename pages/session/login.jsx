import Link from "next/link";
import { Navbar, Sidebar } from "../../components";
import { useState } from "react";
import { Loading } from "../../components";
import { Alert } from "../../components";
import { loginUrl, csrfUrl } from "../../utils/constants";
import { isOnServer } from "../../utils/helpers";
import axios from "axios";
import { UseUIContext } from "../../contexts/UIConttext";
import { useRouter } from 'next/router';

const Login = () => {
    const {setIsAdmin,setIsAuth,setUser} = UseUIContext();
    const router = useRouter();
    const redirected = router.query.alert;
    const initState = {
        email: '',
        password: ''
    };

    const [state,setState] = useState(initState);
    const [error,setError] = useState(initState);
    const [networkError,setNetworkErorr] = useState(false);
    const [loading,setLoading] = useState(false);
    const [alert,setAlert] = useState({type: 'success', message: '', show: false});

    const updateState = (event) => {
        const {name,value} = event.currentTarget;
        setState({...state,[name]: value});
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        setError({...initState});
        let response = null;
        setLoading(true);
        
        try {
            if(!isOnServer() && document.cookie.indexOf('XSRF-TOKEN='))
                await axios.get(csrfUrl,{withCredentials: true});
            response = await axios.post(loginUrl,state,{
                headers : {
                    Accept : 'application/json'
                },
                withCredentials: true
            });
            setLoading(false);
            setAlert({type: 'success', message: response.data.message, show: true});
            setIsAuth(true);
            setUser(response.data.user);
            if(response.data.isAdmin) {
                setIsAdmin(true);
                router.push('/admin');
            }
            else {
                setIsAdmin(false);
                router.push('/');
            }
        } catch(error) {
            if(!error.response) {
                setNetworkErorr(true);
                setAlert({type: 'error', message: 'Network Error', show: true});
            }
            else {
                const errors = error.response.data.errors ? error.response.data.errors : null;
                if(!errors) { 
                    console.log(error.response.data.success);
                    if(error.response.data.success === false)
                        // creds are wrong
                        setAlert({type: 'error', message: error.response.data.message ,show: true});
                    else
                        // something wrong with the server 
                        setAlert({type: 'error', message: 'somthing wrong with the server, try later',show: true});
                }
                else {
                setAlert({type: 'error', message: 'the given inputs are invalid',show: true});
                setError({...errors,State: errors.state});
                }
            }
            setLoading(false);
        }
    }
    return(
        <>
            <Navbar />
            <Sidebar />
            {
            loading ? <Loading className="loading--center"/> :
            networkError ? <h3 className="center">
                Network Error, refresh the page or try later
            </h3> :
            <main className="main-content">
                <Alert alert={alert} setAlert={setAlert}/>
                <h2 className="center">Login</h2>
                <div className="small center">
                    you do not have an acount ?, <Link href="/session/register"><a className="green">register here</a></Link>
                </div>
                <div className="center">
                    normal user: (normal@gmail.com,  normal)
                </div>
                <div className="center">
                    admin: (admin@gamil.com,   admin)
                </div>
                <form className="form" onSubmit={handleSubmit}>
                    {redirected && <div className="red center">you need to login to continue</div>}
                    <div className="form__row">
                        <label className="form__label" htmlFor="email">
                            email:
                        </label>
                        <input type="email" name="email" value={state.email} className="form__input" 
                        placeholder="allilo@gmail.com" id="email" onChange={updateState} />
                        {
                        error.email && 
                        error.email.map((error,index) => <small className="small--red block" key={index}>{error}</small>)
                        }
                    </div>

                    <div className="form__row">
                        <label className="form__label" htmlFor="password">
                            password:
                        </label>
                        <input type="password" name="password" value={state.password} 
                        className="form__input mb-1" placeholder="password" id="passowrd" onChange={updateState} />
                        {
                        error.password && 
                        error.password.map((error,index) => <small className="small--red block" key={index}>{error}</small>)
                        }
                    </div>

                    <button type="submit" className="btn btn--center btn--big mt-2">
                        Login
                    </button>
                </form>
            </main>
            }
        </>
    );
}

export default Login;
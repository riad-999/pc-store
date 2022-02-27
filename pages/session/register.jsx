import { Navbar, Sidebar } from "../../components";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { resgisterUrl } from "../../utils/constants";
import { isOnServer } from "../../utils/helpers";
import { Loading,Alert } from "../../components";

const Register = () => {
    const initState = {
        username: '',
        email: '',
        phone: '',
        password: '',
        confirm: '',
        address: '',
        State: '',
        zipCode: ''
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
        const {username,email,phone,password,confirm: password_confirmation,address,State,zipCode} = state;
        const validNumber = phone[0] == '0' ? phone.substring(1,phone.length) : phone;
        const user = {username,email,password,phone: validNumber,password_confirmation,address,state: State,zipCode};
        const url = 'http://localhost:8000/sanctum/csrf-cookie';
        let response = null;
        setLoading(true);
        try {
            if(!isOnServer() && document.cookie.indexOf('XSRF-TOKEN='))
                await axios.get(url,{withCredentials: true});
            response = await axios.post(resgisterUrl,user,{
                headers : {
                    Accept : 'application/json'
                },
                withCredentials: true
            });
            setLoading(false);
            setAlert({type: 'success', message: 'your account has been registred successfully, thank you.',show: true});
            setState(initState);
        } catch(error) {
            if(!error.response) {
                setNetworkErorr(true);
                setAlert({type: 'error', message: 'Network Error', show: true});
            }
            else {
                const errors = error.response.data.errors ? error.response.data.errors : null;
                if(!errors){
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
    return (
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
                <h2 className="center">register</h2>
                <div className="small center">
                    already have an acount ?, <Link href="/session/login"><a className="green">login here</a></Link>
                </div>
                <form className="form" onSubmit={handleSubmit} autoComplete="off">
                    <div className="form__row">
                        <label className="form__label" htmlFor="username">
                            username:
                        </label>
                        <input type="text" className="form__input" onChange={updateState} 
                        value={state.username} placeholder="Allilo" name="username" id="username" />
                        {
                        error.username && 
                        error.username.map((error,index) => <small className="small--red block" key={index}>{error}</small>)
                        }
                    </div>

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
                        <label className="form__label" htmlFor="phone">
                            phone number:
                        </label>
                        <input type="tel" maxLength='10' name="phone" value={state.phone} className="form__input" 
                        placeholder="792-xx-xx-xx" id="phone" onChange={updateState} />
                        {
                        error.phone && 
                        error.phone.map((error,index) => <small className="small--red block" key={index}>{error}</small>)
                        }
                    </div>

                    <div className="form__row">
                        <label className="form__label" htmlFor="password">
                            password:
                        </label>
                        <input type="password" name="password" value={state.password} 
                        className="form__input mb-1" placeholder="password" id="passowrd" onChange={updateState} />
                        <input type="password" className="form__input" placeholder="confirm password" id="confirm" 
                        name="confirm" value={state.confirm} onChange={updateState}/>
                        {
                        error.password && 
                        error.password.map((error,index) => <small className="small--red block" key={index}>{error}</small>)
                        }
                    </div>

                    {/* <div className="form__row">
                        <label className="form__label" htmlFor="password" >
                           confirm password:
                        </label>
                        <input type="password" className="form__input" placeholder="confirm password" id="confirm" 
                        name="confirm" value={state.confirm} onChange={updateState}/>
                    </div> */}

                    <div className="form__row">
                        <label htmlFor="adress" className="form__label">address:</label>
                        <input id="address" type="text" className="form__input" placeholder="542 w.15th Street" 
                        name="address" value={state.address} onChange={updateState} />
                        {
                        error.address && 
                        error.address.map((error,index) => <small className="small--red block" key={index}>{error}</small>)
                        }
                    </div>

                    <div className="form__row--2-col">
                        <div className="form__row child-60">
                            <label className="form__label" htmlFor="state">state:</label>
                            <input id="state" type="text" className="form__input" placeholder="algiers" 
                            name="State" value={state.State} onChange={updateState} />
                            {
                            error.State && 
                            error.State.map((error,index) => <small className="small--red block" key={index}>{error}</small>)
                            }
                        </div>

                        <div className="form__row child-40">
                            <label htmlFor="zip" className="form__label">zip code:</label>
                            <input id="zip" type="text" className="form__input" placeholder="16000" 
                            name="zipCode" value={state.zipCode} onChange={updateState} />
                            {
                                error.zipCode && 
                                error.zipCode.map((error,index) => <small className="small--red block" key={index}>{error}</small>)
                            }
                        </div>
                    </div>
                    <button type="submit" className="btn btn--center btn--big mt-2">
                        Register
                    </button>
                </form>
            </main>
            }
        </>
    );
}

export default Register;
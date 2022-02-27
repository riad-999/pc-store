import { useState, useEffect} from "react";
import axios from "axios";

const useFetch = (url, method, Data = null, withCredentials = true) => {
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(null);
    const [data,setData] = useState(null);

    const getData = async () => {
        try {
            let response = null;
            if(method === 'get') {
                response = await axios.get(url,{
                    headers: {
                        Accept: 'application/json'
                    },
                    withCredentials
                });
            }
            if(method === 'post') {
                response = await axios.post(url,Data,{
                    headers: {
                        Accept: 'application/json'
                    },
                    withCredentials
                });
            }
            if(method === 'delete') {

            }
            if(method === 'put') {

            }
            setData(response);
        } catch (err) {
            if(!err.response)
                setError({type: 'network',response: null});
            else {
                setError({type: 'normal',response: err.response});
            }
        }
        setLoading(false);
    }

    useEffect(() => {
        console.log('pish');
        getData();
    },[]);
    return {loading,error,data};
}


export default useFetch;


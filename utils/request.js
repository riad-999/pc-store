import axios from "axios";
import {csrfUrl} from '../utils/constants';
import {isOnServer} from '../utils/helpers';

const headers = {
        Accept: 'application/json'
};

async function editRequest(url,method,data,withCredentials)
{
    if(!isOnServer() && document.cookie.indexOf('XSRF-TOKEN='))
        await axios.get(csrfUrl,{withCredentials: true,headers});
    let response = null;

    if(method === 'post'){
        response = await axios.post(url,data,{withCredentials,headers});
    }
    if(method === 'put'){
        response = await axios.put(url,data,{withCredentials,headers});
    }
    if(method === 'delete'){
        response = await axios.delete(url,data,{withCredentials,headers});
    }
    return {
        success: true,
        response
    };
}
async function request(url,method='get',data={},withCredentials=true)
{
    try {
        if(method === 'get') {
            const response = await axios.get(url,{headers,withCredentials});
            return {
                success: true,
                response
            };
        }
        const result = await editRequest(url,method,data,withCredentials);
        return result;
    } catch(error) {
        return {
            success: false,
            response: error.response ? error.response : null
        };
    }
}

export default request;
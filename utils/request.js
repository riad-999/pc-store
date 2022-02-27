import axios from "axios";
import {csrfUrl} from '../utils/constants';
import {isOnServer} from '../utils/helpers';

async function editRequest(url,method,data,withCredentials)
{
    if(!isOnServer() && document.cookie.indexOf('XSRF-TOKEN='))
        await axios.get(csrfUrl,{withCredentials: true});
    let response = null;

    if(method === 'post'){
        response = await axios.post(url,data,{withCredentials});
    }
    if(method === 'put'){
        response = await axios.put(url,data,{withCredentials});
    }
    if(method === 'delete'){
        response = await axios.delete(url,data,{withCredentials});
    }
    return {
        success: true,
        response
    };
}
async function request(url,method='get',data={},withCredentials=true)
{
    try {
        if(method === 'get'){
            const response = await axios.get(url,{withCredentials});
            return {
                success: true,
                response
            };
        }
        return await editRequest(url,method,data,withCredentials);
    } catch(error) {
        return {
            success: false,
            response: error.response ? error.response : null
        };
    }
}

export default request;
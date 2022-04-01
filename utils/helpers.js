export const isOnServer = () => (typeof window === 'undefined')? true : false;
export const toPrice = (price) => {
    const conv = price / 100;
    return conv.toFixed(2);
}

export const handleFailure = (response,setError=null,router=null) => {
    if(router) {
        if(!response) {
            router.push('/error');
        } 
        else {
            if(response.status === 401) {
                router.push('/session/login?alert=true');
            }
            else {
                router.push('/error?unexpected=true');
            }
        }
    }
    else {
        if(!response) {
            setError('network error');
        } 
        else {
            if(response.status === 401) {
                setError('session exipred, you need to login as admin');
            }
            else {
                setError('unexpected error occured');
            }
        }
    }
}

export const isOnServer = () => (typeof window === 'undefined')? true : false;
export const toPrice = (price) => {
    const conv = price / 100;
    return conv.toFixed(2);
}

export const handleFailure = (response,setError) => {
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

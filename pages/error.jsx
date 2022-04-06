import { Layout, Error } from "../components"
import {useRouter} from 'next/router';

const ErrorPage = () => {
    const router = useRouter();
    const unexpected = router.query.unexpected;
    return(
        <Error message={unexpected ? 'unexpected error occured' : "network error" }/>
    );
}

export default ErrorPage;
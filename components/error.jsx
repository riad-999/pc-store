import { Navbar, Sidebar } from "../components";
import { UseUIContext } from "../contexts/UIConttext";
import { BiErrorCircle } from 'react-icons/bi';

const Error = ({message}) => {
    const {error} = UseUIContext();
    return (
        <>
            <Navbar />
            <Sidebar />
            <main className="main-content mt-5 center">
                <h2><BiErrorCircle /></h2>
                <h4>{ message ? message : error.message}</h4>
            </main>
        </>
    );
}


export default Error;

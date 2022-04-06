import { Navbar, Sidebar } from "../components";
import { UseUIContext } from "../contexts/UIConttext";
import { BiErrorCircle } from 'react-icons/bi';

const Error = ({message}) => {
    
    return (
        <>
            <Navbar />
            <Sidebar />
            <main className="main-content mt-5 center">
                <h2><BiErrorCircle /></h2>
                <h4>{ message ? message : 'network error refresh the page or try later'}</h4>
            </main>
        </>
    );
}


export default Error;

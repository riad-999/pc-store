import { Error } from ".";
import { UseUIContext } from "../contexts/UIConttext";
import { Navbar, Sidebar } from ".";

const Layout = ({children}) => {
    const {error} = UseUIContext();
    if(error) {
        return (
            <Error />
        );
    }
    return (
        <>
            <Navbar />
            <Sidebar />
            {children}
        </>
    );
}

export default Layout;
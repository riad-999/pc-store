import Link from "next/link";
import { links } from "../utils";
import Logo from "./logo";
import { FaTimes} from "react-icons/fa"
import { CartBtn } from ".";
import { Loading } from ".";
import { UseUIContext } from "../contexts/UIConttext";
import { FiUserCheck} from "react-icons/fi";
import { FiUserMinus } from "react-icons/fi";

const Sidebar = () => {
    const {isSidebarOpen, closeSidebar, logout, isAuth, setIsAuth} = UseUIContext();

    return (
        <aside className={isSidebarOpen ? 'sidebar sidebar__show' : 'sidebar'}>
            <button type="button" className="sidebar__close" onClick={closeSidebar}>
                <FaTimes />
            </button>
            <Logo />
            <ul className="sidebar__list">
                {links.map(link => {
                    const {id,name,path} = link;
                    return (
                        <li key={id}>
                            <Link href={path}>
                                <a className="sidebar__link">
                                    {name}
                                </a>
                            </Link>
                        </li>
                    );
                })}
            </ul>
            <div className="sidebar__btns">
                <CartBtn />
                {
                    isAuth === null ? 
                    <button type="button" className="auth">
                        <Loading className='loading--small' />
                    </button> : 
                    <button type="button" className="auth">
                    {
                    !isAuth ? 
                    <Link href="/session/login"><a>Login <FiUserMinus /></a></Link> : 
                    <span onClick={logout}>Logout <FiUserCheck /></span>
                    }
                    </button>
                }
            </div>
        </aside>
    );
}

export default Sidebar;
import Link from "next/link";
import { links } from "../utils";
import Logo from "./logo";
import { FaTimes} from "react-icons/fa"
import { CartBtn } from ".";
import { UseUIContext } from "../contexts/UIConttext";
import Auth from "./auth";

const Sidebar = () => {
    const {isSidebarOpen, closeSidebar, isAdmin} = UseUIContext();

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
                <Auth /> 
                <button className="ml-1 green">
                    {isAdmin ? 
                    <Link href="/admin"><a>administration</a></Link>: 
                    <Link href="/account"><a>account</a></Link>}
                </button>
            </div>
        </aside>
    );
}

export default Sidebar;
import Logo from "./logo";
import Link from "next/link";
import { links } from '../utils';
import { GiHamburgerMenu } from "react-icons/gi";
import { DropDown, CartBtn } from ".";
import { UseUIContext } from "../contexts/UIConttext";
import Auth from "./auth";

const Navbar = () => {
    const {openSidebar,isAdmin,isAuth} = UseUIContext();

    return (
        <header className="main-header">
            <nav className="navbar">
                <Logo />
                <ul className="navbar__list">
                    {links.map(link => {
                        const {id,name,path} = link;
                        return (
                            <li className="navbar__item" key={id}>
                                <Link href={path}>
                                    <a className="navbar__link">{name}</a>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
                <button type="button" className="sidebar__show" onClick={openSidebar}>
                    <GiHamburgerMenu />
                </button>
                <div className="navbar__btns">
                    {isAdmin && 
                    <button className="btn ml-1" type="btn">
                        <Link href="/orders"><a>admin</a></Link>
                    </button>
                    }
                    {
                        !isAdmin && <CartBtn />
                    }
                    {
                    isAuth &&
                    <button className="btn ml-1" type="btn">
                        {
                            !isAdmin ? 
                            <Link href="/account"><a>my Orders</a></Link> : 
                            <Link href="/orders"><a>orders</a></Link>
                        }
                    </button>
                    }
                    <Auth />
                </div>
            </nav>
        </header>
    );
}

export default Navbar;
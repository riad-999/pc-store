import Logo from "./logo";
import Link from "next/link";
import { links } from '../utils';
import { GiHamburgerMenu } from "react-icons/gi";
import { Auth, CartBtn } from ".";
import { UseUIContext } from "../contexts/UIConttext";

const Navbar = () => {
    const {openSidebar,logout} = UseUIContext();

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
                    <CartBtn />
                    <Auth />
                </div>
            </nav>
        </header>
    );
}

export default Navbar;
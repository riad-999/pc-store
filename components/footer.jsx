import { Logo } from ".";

const Footer = () => {
    const currentTime = new Date();
    return (
        <footer className="footer">
            <div>&copy; {currentTime.getFullYear()} All rights reserved</div>
            <Logo />
        </footer>
    );
}

export default Footer;
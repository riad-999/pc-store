const Hero = (props) => {
    const {title, path} = props;
    if(path === 'products'){
        return (
            <section className="hero">
                <div>
                <Link href="/products">
                    <a>Products</a>
                </Link>/
                {title}
            </div>
            </section>
        );
    }
    if(path === 'about')
    return (
        <section className="hero">
            <div>
                <Link href="/">
                    <a>Home</a>
                </Link>/
                {title}
            </div>
        </section>
    );
}

export default Hero;
import Link from "next/link";

const Error = () => {
    return (
        <main className="error">
            <h3>404, page not found</h3>
            <button type="button" className="btn btn--big">
                <Link href="/">
                    <a>back home</a>
                </Link>
            </button>
        </main>
    );
}

export default Error;
import Link from "next/link";
import { Navbar, Sidebar } from "../../components";

const Login = () => {
    return(
        <>
            <Navbar />
            <Sidebar />
            <main className="main-content">
                <h2 className="center">Login</h2>
                <div className="small center">
                    don't have an acount ?, <Link href="/session/register"><a className="green">register here</a></Link>
                </div>
                <form className="form">
                    <div className="form__row">
                        <label className="form__label" htmlFor="email">
                            email:
                        </label>
                        <input type="email" className="form__input" placeholder="email" name="email" id="email" />
                    </div>

                    <div className="form__row">
                        <label className="form__label" htmlFor="password">
                            password:
                        </label>
                        <input type="password" className="form__input" placeholder="password" name="password" id="passowrd" />
                    </div>

                    <button type="submit" className="btn btn--center btn--big mt-2">
                        Login
                    </button>
                </form>
            </main>
        </>
    );
}

export default Login;
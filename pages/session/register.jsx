import { Navbar, Sidebar } from "../../components";
import Link from "next/link";

const Register = () => {
    return (
        <>
            <Navbar />
            <Sidebar />
            <main className="main-content">
                <h2 className="center">register</h2>
                <div className="small center">
                    already have an acount ?, <Link href="/session/login"><a className="green">login here</a></Link>
                </div>
                <form className="form">
                    <div className="form__row">
                        <label className="form__label" htmlFor="username">
                            username:
                        </label>
                        <input name="username" className="form__input" placeholder="Allilo" id="username" />
                    </div>

                    <div className="form__row">
                        <label className="form__label" htmlFor="email">
                            email:
                        </label>
                        <input type="email" className="form__input" placeholder="allilo@gmail.com" name="email" id="email" />
                    </div>

                    <div className="form__row">
                        <label className="form__label" htmlFor="password">
                            password:
                        </label>
                        <input type="password" className="form__input" placeholder="password" name="password" id="passowrd" />
                    </div>

                    <div className="form__row">
                        <label for="adress" className="form__label">address:</label>
                        <input id="address" type="text" className="form__input" placeholder="542 w.15th Street" />
                    </div>
                    <div className="form__row--2-col">
                        <div className="form__row child-60">
                            <label className="form__label" for="state">state:</label>
                            <input id="state" type="text" className="form__input" placeholder="algiers" />
                        </div>

                        <div className="form__row child-40">
                            <label for="zip" className="form__label">zip code:</label>
                            <input id="zip" type="text" className="form__input" placeholder="16000" />
                        </div>
                    </div>
                    <button type="submit" className="btn btn--center btn--big mt-2">
                        Register
                    </button>
                </form>
            </main>
        </>
    );
}

export default Register;
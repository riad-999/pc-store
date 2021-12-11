import { FiUserCheck} from "react-icons/fi";
import { FiUserMinus } from "react-icons/fi";

const Auth = () => {
    const isAuth = true;
    return (
        <button type="button" className="auth">
            {
            isAuth ? 
            <span>Logout <FiUserMinus /></span> : 
            <span>Login <FiUserCheck /></span>
            }
        </button>
    );
}

export default Auth;
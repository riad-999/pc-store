import { useEffect } from "react";

const Alert = ({alert,setAlert}) => {
    const {type,message,show} = alert;
    useEffect(() => {
        const timout = setTimeout(() => {
            setAlert({...alert,show: false});
        }, 3000);
        return () => clearTimeout(timout);
    },[alert]);
    return (
        <section className={show ? `alert alert--${type}` : `alert alert--${type} hide`}>
            {message}
        </section>
    );
}

export default Alert;
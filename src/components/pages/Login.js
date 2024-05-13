import { useRef,useState,useEffect,useContext} from 'react';
import AuthContext from "../../context/AuthProvider";
import {Link} from "react-router-dom";

const Login =()=>{
    const userRef = useRef();
    const errRef= useRef();
    //const {setAuth} = useContext(AuthContext);

    const [user,setUser]=useState('');
    const [pwd,setPwd]=useState('');
    const [errMsg,setErrMsg]=useState('');
    const [success,setSuccess]=useState(false);

    useEffect(() => {
        userRef.current.focus()
    }, []);

    useEffect(() => {
        setErrMsg('')
    }, [user,pwd]);

    const handleSubmit = async (e)=>{
        e.preventDefault();
        console.log(user,pwd)
        setSuccess(true)

    }
    return (success?(
            <section>
                <h1>You are logged in</h1>
                <p>
                    <a href='#'>Go to home</a>
                </p>
            </section>
            ):(
                <section>
                <p ref={errRef} className={errMsg?"errmsg":"offscreen"} aria-live="assertive">{errMsg}</p>
                <h1>Sign in</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username">
                        Username:
                    </label>
                    <input
                        type="text"
                        id="username"
                        required
                        autoComplete="off"
                        ref={userRef}
                        onChange={(e) => setUser(e.target.value)}
                        value={user}
                    />
                    <label htmlFor="password">
                        Password:
                    </label>
                    <input
                        type="password"
                        id="password"
                        required
                        onChange={(e) => setPwd(e.target.value)}
                        value={pwd}
                    />
                    <button>Sign In</button>
                    <p>
                        Need an account?<br/>
                        <span className="line">
                            <Link to="/Register">Register here</Link>
                        </span>
                    </p>
                </form>
            </section>
        )
    )
}

export default Login;
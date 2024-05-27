import { useRef,useState,useEffect} from 'react';
import {Link, useNavigate} from "react-router-dom";
import axios from 'axios';
import Cookies from 'js-cookie';
import './Login.css';

const Login =()=>{
    const userRef = useRef();
    const errRef= useRef();

    const [user,setUser]=useState('');
    const [pwd,setPwd]=useState('');
    const [errMsg,setErrMsg]=useState('');
    const [success,setSuccess]=useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        userRef.current.focus()
    }, []);

    useEffect(() => {
        setErrMsg('')
    }, [user,pwd]);

    // const handleSubmit = async (e)=>{
    //     e.preventDefault();
    //     console.log(user,pwd)
    //     setSuccess(true)

    // }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:6541/login', { email: user, password: pwd });
            if (response.data.message === 'Welcome User') {
                Cookies.set('jwt', response.data.token); // Save the JWT to a cookie
                setSuccess(true);
            } else {
                setErrMsg(response.data.error);
            }
        } catch (error) {
            console.error('Error:', error);
            setErrMsg('Email or password is wrong, Please try again.');
        }
    };

    return (success?(
            <section>
                {navigate('/event_list')}
            </section>
            ):(
                <section className='signin'>
                <div className="signin-form">
                    <h1>Sign in</h1>
                    {errMsg && <p className="errmsg">{errMsg}</p>}
                    <form onSubmit={handleSubmit}>
                    <label className='signin-label' htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        required
                        autoComplete="off"
                        ref={userRef}
                        className="signin-input"
                        onChange={(e) => setUser(e.target.value)}
                        value={user}
                    />
                    <label className='signin-label' htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        required
                        className="signin-input"
                        onChange={(e) => setPwd(e.target.value)}
                        value={pwd}
                    />
                    <button className='signin-button'>Sign In</button>
                    </form>
                    <p className="signup-link">
                    Need an account?{' '}
                    <Link to="/Register">Register here</Link>
                    </p>
                </div>
                </section>

        )
    )
}

export default Login;
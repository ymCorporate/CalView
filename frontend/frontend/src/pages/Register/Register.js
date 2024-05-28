import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { GraphQLClient } from 'graphql-request';
import { registerUser } from "./RegisterQuery";
// import axios from 'axios'; 
import "./Register.css";

const EMAIL_REGX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PWD_REGX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const NAME_REGX = /^[a-zA-Z][a-zA-Z]/;


const graphqlClient = new GraphQLClient('http://localhost:8080/v1/graphql', {
    headers: {
        'x-hasura-admin-secret': '123',
    },
});

const Register = () => {
    const emailRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [firstName, setFirstName] = useState('');
    const [validFirstName, setValidFirstName] = useState(false);

    const [lastName, setLastName] = useState('');
    const [validLastName, setValidLastName] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        emailRef.current.focus();
    }, []);

    useEffect(() => {
        const result = EMAIL_REGX.test(email);
        setValidEmail(result);
    }, [email]);

    useEffect(() => {
        const result = PWD_REGX.test(pwd);
        setValidPwd(result);
        const match = pwd === matchPwd;
        setValidMatch(match);
    }, [pwd, matchPwd]);

    useEffect(() => {
        const result = NAME_REGX.test(firstName);
        setValidFirstName(result);
    }, [firstName]);

    useEffect(() => {
        const result = NAME_REGX.test(lastName);
        setValidLastName(result);
    }, [lastName]);

    useEffect(() => {
        setErrMsg('');
    }, [email, pwd, matchPwd]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const v1 = EMAIL_REGX.test(email);
        const v2 = PWD_REGX.test(pwd);
        if (!v1 || !v2) {
            setErrMsg('Invalid entry');
            return;
        }

        try {
            const response = await graphqlClient.request(registerUser, {
                email,
                password: pwd,
                firstName,
                lastName,
                company: document.getElementById('companyname').value,
                role: document.getElementById('companyrole').value
            });
            console.log(response);
            if(response){
                setSuccess(true);
            }
            else{
                setErrMsg('Registration Failed');
            }
        } catch (err) {
            setErrMsg('Registration Failed');
        }
    }

    return (
        <>
            {success ? (
                <section className="register-success">
                    <h1>Success!</h1>
                    <p><Link to='/'>Sign in</Link></p>
                </section>
            ) : (
                <section className="register-section">
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Register</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="email">
                            Email:
                            <span className={validEmail ? "valid" : "hide"}>
                                <FontAwesomeIcon icon={faCheck} />
                            </span>
                            <span className={validEmail || !email ? "hide" : "invalid"}>
                                <FontAwesomeIcon icon={faTimes} />
                            </span>
                        </label>
                        <input
                            type="email"
                            id="email"
                            ref={emailRef}
                            autoComplete="off"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            aria-invalid={validEmail ? "false" : "true"}
                            aria-describedby="emailnote"
                            onFocus={() => setEmailFocus(true)}
                            onBlur={() => setEmailFocus(false)}
                        />
                        <p id="emailnote" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Must be a valid email address.
                        </p>
                        <label htmlFor="password">
                            Password:
                            <span className={validPwd ? "valid" : "hide"}>
                                <FontAwesomeIcon icon={faCheck} />
                            </span>
                            <span className={validPwd || !pwd ? "hide" : "invalid"}>
                                <FontAwesomeIcon icon={faTimes} />
                            </span>
                        </label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            required
                            aria-invalid={validPwd ? "false" : "true"}
                            aria-describedby="pwdnote"
                            onFocus={() => setPwdFocus(true)}
                            onBlur={() => setPwdFocus(false)}
                        />
                        <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            8 to 24 characters<br />
                            Must include one uppercase, one lowercase, one number, and one special character<br />
                            Allowed special characters: ! @ # $ %
                        </p>
                        <label htmlFor="confirm-pwd">
                            Confirm Password:
                            <span className={matchPwd && validMatch ? "valid" : "hide"}>
                                <FontAwesomeIcon icon={faCheck} />
                            </span>
                            <span className={validMatch || !matchPwd ? "hide" : "invalid"}>
                                <FontAwesomeIcon icon={faTimes} />
                            </span>
                        </label>
                        <input
                            type="password"
                            id="confirm-pwd"
                            required
                            onChange={(e) => setMatchPwd(e.target.value)}
                            aria-invalid={validMatch ? "false" : "true"}
                            aria-describedby="confirmPwdnote"
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                        />
                        <p id="confirmPwdnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Must match the password entered
                        </p>
                        <label htmlFor="firstname">
                            First Name:
                            <span className={validFirstName ? "valid" : "hide"}>
                                <FontAwesomeIcon icon={faCheck} />
                            </span>
                            <span className={validFirstName || !firstName ? "hide" : "invalid"}>
                                <FontAwesomeIcon icon={faTimes} />
                            </span>
                        </label>
                        <input
                            type="text"
                            id="firstname"
                            required
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        <label htmlFor="lastname">
                            Last Name:
                            <span className={validLastName ? "valid" : "hide"}>
                                <FontAwesomeIcon icon={faCheck} />
                            </span>
                            <span className={validLastName || !lastName ? "hide" : "invalid"}>
                                <FontAwesomeIcon icon={faTimes} />
                            </span>
                        </label>
                        <input
                            type="text"
                            id="lastname"
                            required
                            onChange={(e) => setLastName(e.target.value)}
                        />
                        <label htmlFor="companyname">
                            Company:
                        </label>
                        <input
                            type="text"
                            id="companyname"
                            required
                        />
                        <label htmlFor="companyrole">
                            Role:
                        </label>
                        <input
                            type="text"
                            id="companyrole"
                            required
                        />
                        <button
                            disabled={!validEmail || !validPwd || !validFirstName || !validLastName || !validMatch ? true : false}>
                            Sign Up
                        </button>
                        <p>
                            Already registered?<br />
                            <span className="line">
                                <Link to="/">Sign in</Link>
                            </span>
                        </p>
                    </form>
                </section>
            )}
        </>
    );
}

export default Register;

import { useRef,useState,useEffect} from "react";
import { faCheck,faTimes,faInfoCircle} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const USER_REGX = /^[a-zA-Z][a-zA-Z0-9_]{3,23}$/;
const PWD_REGX =/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = ()=>{
    const userRef = useRef();
    const errRef = useRef();

    const [user,setUser] = useState('')
    const [validName,setValidName]=useState(false)
    const [userFocus,setUserFocus]=useState(false)

    const [pwd,setPwd]=useState('');
    const [validPwd,setValidPwd]=useState(false)
    const [pwdFocus,setPwdFocus]=useState(false)

    const [matchPwd,setMatchPwd]=useState('')
    const [validMatch,setValidMatch]=useState(false)
    const [matchFocus,setMatchFocus]=useState(false)

    const [errMsg,setErrMsg]= useState('')
    const [success,setSuccess]=useState(false)

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(()=>{
        const result = USER_REGX.test(user)
        console.log(user)
        console.log(result)
        setValidName(result);
    },[user])

    useEffect(() => {
        const result = USER_REGX.test(pwd)
        console.log(pwd)
        console.log(result)
        setValidPwd(result)
        const match = pwd === matchPwd
        setValidMatch(match)
    }, [pwd,matchPwd]);

    useEffect(()=>{
        setErrMsg('');
    },[user,pwd,matchPwd])
    return(
        <section>
            <p ref={errRef} className={errMsg ? "errmsg":"offscreen"}
               aria-live="assertive">{errMsg}</p>
            <h1>Register</h1>
            <form>
                <label htmlFor="username">
                    Username:
                    <span className={validName ? "valid" : "hide"}>
                        <FontAwesomeIcon icon={faCheck}/>
                    </span>
                    <span className={validName || !user ? "hide" : "invalid"}>
                        <FontAwesomeIcon icon={faTimes}/>
                    </span>
                </label>
                <input
                    type="text"
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    required
                    aria-invalid={validName ? "false" : "true"}
                    aria-describedby="uidnote"
                    onFocus={() => setUserFocus(true)}
                    onBlur={() => setUserFocus(false)}
                />
                <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                    < FontAwesomeIcon icon={faInfoCircle}/>
                    4 to 24 characters<br/>
                    Must begin with a letter<br/>
                    Letters,Numbers,underscores,hyphens allowed
                </p>
                <label htmlFor="password">
                    Password:
                    <span className={validPwd ? "valid" : "hide"}>
                        <FontAwesomeIcon icon={faCheck}/>
                    </span>
                    <span className={validPwd || !pwd ? "hide" : "invalid"}>
                        <FontAwesomeIcon icon={faTimes}/>
                    </span>
                </label>
                <input
                    type="password"
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    required
                    aria-invalid={validPwd ? "false" : "true"}
                    aria-describedby="pwdnote"
                    onFocus={() => {
                        setPwdFocus(true)
                    }}
                    onBlur={() => {
                        setPwdFocus(false)
                    }}
                />
                <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle}/>
                    8 to 24 Characters<br/>
                    Must begin with a letter,Must include<br/>
                    One Uppercase,one Lowercase and one special Character<br/>
                    Allowed special characters:<span aria-label="exclaimaitory-mark">!</span>
                    <span aria-label="at the rate">@</span><span aria-label="hash tag">#</span>
                    <span aria-label="dollar sign">$</span><span aria-label="percentage">%</span>
                </p>
                <label htmlFor="confirm-pwd">
                    Confirm-password:
                    <span className={matchPwd && validMatch ? "valid" : "hide"}>
                        <FontAwesomeIcon icon={faCheck}/>
                    </span>
                    <span className={validMatch || !matchPwd ? "hide" : "invalid"}>
                        <FontAwesomeIcon icon={faTimes}/>
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
                    <FontAwesomeIcon icon={faInfoCircle}/>
                    Must match the password entered
                </p>
                <button disabled={!validName || !validPwd || !validMatch}>Sign up</button>
            </form>
        </section>
    )
}

export default Register
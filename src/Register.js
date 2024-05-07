import { useRef,useState,useEffect} from "react";
import { faCheck,faTimes,faInfoCircle} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import axios from './api/axios'

const USER_REGX = /^[a-zA-Z][a-zA-Z0-9_]{3,23}$/;
const PWD_REGX =/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const NAME_REGX=/^[a-zA-Z][a-zA-Z]/;
const PHONE_REGX=/^[0-9]{10}/;

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

    const [firstName,setFirstName]=useState('')
    const [validFirstName,setValidFirstName]=useState(false)

    const [lastName,setLastName]=useState('')
    const [validLastName,setValidLastName]=useState(false)

    const [phone,setPhone]=useState('')
    const [validPhone,setValidPhone]=useState(false)

    const [errMsg,setErrMsg]= useState('')
    const [success,setSuccess]=useState(false)

    const REG_URL = '/register'

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
        const result = PWD_REGX.test(pwd)
        console.log(pwd)
        console.log(result)
        setValidPwd(result)
        const match = pwd === matchPwd
        setValidMatch(match)
    }, [pwd,matchPwd]);

    useEffect(()=>{
        const result = NAME_REGX.test(firstName)
        console.log(firstName)
        console.log(result)
        setValidFirstName(result);
    },[firstName])

    useEffect(()=>{
        const result = NAME_REGX.test(lastName)
        console.log(lastName)
        console.log(result)
        setValidLastName(result);
    },[lastName])

    useEffect(()=>{
        const result = PHONE_REGX.test(phone)
        console.log(phone)
        console.log(result)
        setValidPhone(result);
    },[phone])

    useEffect(()=>{
        setErrMsg('');
    },[user,pwd,matchPwd])

    const handleSubmit= async (e)=>{
        e.preventDefault();
        const v1 = USER_REGX.test(user)
        const v2 = PWD_REGX.test(pwd)
        if(!v1 || !v2) {
            setErrMsg('Invalid entry');
            return;
        }
        console.log(user,pwd)
        setSuccess(true)
        }
        // try{
        //     const response = await axios.post(REG_URL,JSON.stringify(
        //         {user,pwd}),{
        //         headers:{'content-type':'/application/json'},
        //         withCredentials:true
        //     })
        //     console.log(response.data)
        //     console.log(JSON.stringify(response))
        //     setSuccess(true)
        // }catch(err){
        //     setErrMsg(err)
        // }
    return(
        <>
            {success?(
            <section>
                <h1>Success!</h1>
                <p><a href='#'>Sign up</a></p>
            </section>
              ):(<section>
                    <p ref={errRef} className={errMsg ? "errmsg":"offscreen"}
                       aria-live="assertive">{errMsg}</p>
                    <h1>Register</h1>
                    <form onSubmit={handleSubmit}>
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
                        <label htmlFor="firstname">
                            First name:
                            <span className={validFirstName ? "valid" : "hide"}>
                                <FontAwesomeIcon icon={faCheck}/>
                            </span>
                            <span className={validFirstName || !firstName ? "hide" : "invalid"}>
                                <FontAwesomeIcon icon={faTimes}/>
                            </span>
                        </label>
                        <input
                            type="text"
                            id="firstname"
                            required
                            onChange={(e) => setFirstName(e.target.value)}

                        />
                        <label htmlFor="lastname">
                            Last name:
                            <span className={validLastName ? "valid" : "hide"}>
                                <FontAwesomeIcon icon={faCheck}/>
                            </span>
                            <span className={validLastName|| !lastName ? "hide" : "invalid"}>
                                <FontAwesomeIcon icon={faTimes}/>
                            </span>
                        </label>
                        <input
                            type="text"
                            id="lastname"
                            required
                            onChange={(e) => setLastName(e.target.value)}
                        />
                        <label htmlFor="phone">
                            Phone:
                            <span className={validPhone ? "valid" : "hide"}>
                                <FontAwesomeIcon icon={faCheck}/>
                            </span>
                            <span className={validPhone|| !phone ? "hide" : "invalid"}>
                                <FontAwesomeIcon icon={faTimes}/>
                            </span>
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            required
                            onChange={(e)=>setPhone(e.target.value)}
                        />
                        <label htmlFor="companyname">
                            Company:
                        </label>
                        <input
                            type="text"
                            id="companyname"
                        />
                        <button disabled={!validName || !validPwd || !validFirstName || !validLastName || !validMatch ? true : false}>Sign up</button>
                        <p>
                            Already registered?<br/>
                            <span className="line">
                                <a href='#'>Sign In</a>
                            </span>
                        </p>
                    </form>
                </section>
            )}
        </>
    )
}

export default Register

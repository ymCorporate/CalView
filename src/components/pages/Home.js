import {Link} from "react-router-dom";

const Home =()=>{

    const logout = ()=>{

    }
    return(
        <section>
            <h1>Home</h1>
            <br/>
            <p>You are logged in</p>
            <br/>
            <Link to="/Editor">Editor</Link>
            <br/>
            <Link to="/Admin">Admin</Link>
            <br/>
            <Link to="/LinkPage">Go to Link Page</Link>
            <br/>
            <button onClick={logout}>sign out</button>
        </section>
    )
}

export default Home
import {Link} from "react-router-dom";

const LinkPage=()=>{
    return(
        <section>
            <h1>Public</h1>
            <br/>
            <Link to='/Login'>Login</Link>
            <Link to='/Register'>Register</Link>
            <br/>
            <h1>Private</h1>
            <br/>
            <Link to='/Admin'>Admin</Link>
            <Link to='/Editor'>Editor</Link>
            <Link to='/'>Home</Link>
        </section>
    )
}

export  default LinkPage
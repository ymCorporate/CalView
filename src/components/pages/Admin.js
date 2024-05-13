import {Link} from "react-router-dom";

const Admin = ()=>{
    return(
        <main>
            <h1>Welcome Admin!</h1>
            <br/>
            <p>Set Availability and set events with Calview!, a calendar scheduling app!</p>
            <Link to='/'>home</Link>
        </main>
    )
}

export default Admin
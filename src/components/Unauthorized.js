import {useNavigate} from "react-router-dom";

const Unauthorized=()=>{
    const navigate=useNavigate()
    const goBack = navigate(-1)

    return(
        <section>
            <h1>Unauthorized access</h1>
            <p>This page requires Authorization access</p>
            <div>
                <button onClick={goBack}>go back</button>
            </div>
        </section>
    )
}

export default Unauthorized
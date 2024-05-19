import { Outlet } from "react-router-dom";

const layout=()=> {
    return (
        <main className="App">
            <Outlet/>
        </main>
    )
}



export default layout


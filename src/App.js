import Register from './components/Register'
import Login from './components/Login'
import Layout from "./components/Layout";
import { Routes,Route} from "react-router-dom";
import LinkPage from "./components/LinkPage";
import Home from "./components/Home";
import Editor from "./components/Editor";
import Lounge from "./components/Lounge";
import Admin from "./components/Admin";
import Missing from "./components/Missing";
import Unauthorized from "./components/Unauthorized";

function App() {
  return (
      <Routes>
          <Route path="/" element={<Layout/>}>
              <Route path="Login" element={<Login/>}/>
              <Route path="Register" element={<Register/>}/>
              <Route path="LinkPage" element={<LinkPage/>}/>
              <Route path="Unauthorized" element={<Unauthorized/>}/>

              <Route path="/" element={<Home/>}/>
              <Route path="Editor" element={<Editor/>}/>
              {/*<Route path="Lounge" element={<Lounge/>}/>*/}
              <Route path="Admin" element={<Admin/>}/>

              <Route path="*" element={<Missing/>}/>
          </Route>
      </Routes>
  );
}

export default App;

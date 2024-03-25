import { BrowserRouter ,Route,Routes} from "react-router-dom";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import User from "./pages/User";
function App() {

  return (
    <div>
        <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<Signin/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/home" element={<Home/>}/>
          <Route path="/user" element={<User/>}/>
        </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App

import Navbar from "./components/Navbar"
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Body from "./Body";
import Login from "./components/Login";
import Profile from "./components/Profile";


function App() {


  return (
    <>
<BrowserRouter>
<Routes>
  <Route path="/" element={<Body/>}>
    <Route path="/login" element={<Login/>}></Route>
    <Route path="/profile" element={<Profile/>}></Route>
  </Route>
</Routes>
</BrowserRouter>




    </>
  )
}

export default App

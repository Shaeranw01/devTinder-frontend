
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Feed from "./components/Feed";
import Connections from "./components/Connections";
import Requests from "./components/Requests";
import ErrorPage from "./components/ErrorPage";
import {Provider} from "react-redux"
import appStore from "./utils/appStore";


function App() {


  return (
    <>
    <Provider store={appStore}>
<BrowserRouter>
<Routes>
  <Route path="/" element={<Body/>}>
    <Route  index element={<Feed/>}></Route>
    <Route path="/login" element={<Login/>}></Route>
    <Route path="/profile" element={<Profile/>}></Route>
    <Route path="/requests" element={<Requests/>}></Route>
    <Route path="/connections" element={<Connections/>}></Route>
    <Route path="/error" element={<ErrorPage />} />
  </Route>
</Routes>
</BrowserRouter>

</Provider>


    </>
  )
}

export default App

import React from 'react'
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import axios from "axios";
import { BASE_URL } from '../utils/constants';
import { removeUser } from '../utils/userSlice';
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom"

const Navbar = () => {
const user= useSelector((store)=>store.user);
const dispatch=useDispatch();
const navigate=useNavigate();
console.log("user",user);
const handleLogOut=async()=>{
    try{
        await axios.post(BASE_URL+"/logout",{},{withCredentials:true})
        //clear the reduxstore of the current loggedin user
        dispatch(removeUser())
        return navigate("/login");
    }catch(err){
        navigate("/error");
    }

}
  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm">
  <div className="flex-1">
    <Link to="/" className="btn btn-ghost text-xl">👩🏻‍💻 Dev Tinder </Link>
  </div>
  <div className="flex gap-2">
    <p className="input input-bordered w-24 md:w-auto" >{user && `Welcome ${user.firstName}`}</p>
    <div className="dropdown dropdown-end mx-5">
      { user && <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div>}
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li>
          <Link to="/profile" className="justify-between">
            Profile
            <span className="badge">New</span>
          </Link>
        </li>
        <li>
          <Link to="/connections" className="justify-between">
           Connections
          
          </Link>
        </li>
        <li><a>Settings</a></li>
        <li onClick={handleLogOut} ><a>Logout</a></li>
      </ul>
    </div>
  </div>
</div>
    </div>
  )
}

export default Navbar

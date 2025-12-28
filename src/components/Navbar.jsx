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
    <nav className="w-full bg-black/90 backdrop-blur-md shadow-lg sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-pink-400 hover:text-pink-300 transition"
        >
          👩🏻‍💻 Dev Tinder
        </Link>

        {/* Dropdown if logged in */}
        {user && (
  <div className="dropdown dropdown-end ml-2 sm:ml-4 mt-2">
    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
      <div className="w-10 sm:w-12 rounded-full border-2 border-pink-500">
        <img src={user.photoURL} alt="Profile" />
      </div>
    </label>

    <ul className="menu dropdown-content bg-pink-500/40 backdrop-blur-md border border-pink-400 rounded-lg shadow-lg w-44 sm:w-52 mt-3 p-2 text-white">
      <li className="rounded transition-all duration-200 hover:bg-pink-600/50 hover:shadow-[0_0_10px_rgb(255,20,147)]">
        <Link
          className="block px-4 py-2 text-white"
          to="/profile"
        >
          Profile
        </Link>
      </li>
      <li className="rounded transition-all duration-200 hover:bg-pink-600/50 hover:shadow-[0_0_10px_rgb(255,20,147)]">
        <Link
          className="block px-4 py-2 text-white"
          to="/connections"
        >
          Connections
        </Link>
      </li>
      <li className="rounded transition-all duration-200 hover:bg-pink-600/50 hover:shadow-[0_0_10px_rgb(255,20,147)]">
        <Link
          className="block px-4 py-2 text-white"
          to="/requests"
        >
          Requests
        </Link>
      </li>
      <li className="rounded transition-all duration-200 hover:bg-pink-600/50 hover:shadow-[0_0_10px_rgb(255,20,147)]">
        <Link
          className="block px-4 py-2 text-white"
          to="/premium"
        >
          Premium
        </Link>
      </li>
      <li className="rounded transition-all duration-200 hover:bg-pink-600/50 hover:shadow-[0_0_10px_rgb(255,20,147)]">
        <button
          className="w-full text-left block px-4 py-2 text-white"
          onClick={handleLogOut}
        >
          Logout
        </button>
      </li>
    </ul>
  </div>
)}
      </div>
    </nav>
  );
};


export default Navbar

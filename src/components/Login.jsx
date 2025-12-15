import React, {useState} from 'react'
import axios  from 'axios';
import {useDispatch} from "react-redux";
import { addUser } from '../utils/userSlice';
import {useNavigate} from "react-router-dom";
import { BASE_URL } from '../utils/constants';

const Login = () => {
    const [emailId, setEmailId]=useState("meera@gmail.com");
    const [password, setPassword]=useState("Meera@12345");
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const handleLogin=async()=>{
     try{
        const res=await axios.post(BASE_URL+"/login",{
            emailId,
            password
        },{withCredentials:true})
        //adding userdata to store by dispatching add user action
        dispatch(addUser(res.data));
        return navigate("/");
     }
     catch(err){
        console.log(err)
     }
    }
  return (
   
 <div className="flex justify-center mt-10">
  <div className="bg-base-200 border border-base-300 rounded-box w-72 p-4">
    <h2 className="text-center text-lg font-semibold mb-6">
      Login
    </h2>

    <label className="label">Email</label>
    <input
      type="email"
      className="input input-bordered rounded-lg w-full p-2 text-sm"
      placeholder="Email"
      value={emailId}
      onChange={(e)=>setEmailId(e.target.value)}
    />

    <label className="label mt-2">Password</label>
    <input
      type="password"
      className="input input-bordered rounded-lg w-full p-2 text-sm"
      placeholder="Password"
      value={password}
      onChange={(e)=>setPassword(e.target.value)}
    />

    <button className="btn btn-neutral w-full mt-6" onClick={()=>handleLogin()}>
      Login
    </button>
  </div>
</div>

  )
}

export default Login

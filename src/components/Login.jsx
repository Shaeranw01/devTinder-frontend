import React, {useState} from 'react'
import axios  from 'axios';
import {useDispatch} from "react-redux";
import { addUser } from '../utils/userSlice';
import {useNavigate} from "react-router-dom";
import { BASE_URL } from '../utils/constants';


const Login = () => {
    const [firstName, setFirstName]=useState("");
    const [lastName, setLastName]=useState("");
    const [emailId, setEmailId]=useState("");
    const [password, setPassword]=useState("");
    const [error, setError]=useState("");
    const [isLogin, setLogin]=useState(true);

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
       console.error("err",err);
       setError( err?.response?.data?.message ||
        err?.response?.data ||
        "Something went wrong!!")
     }
    }
    const handleSignUp=async()=>{
        try{
           const res=await axios.post(BASE_URL+"/signup",{
               firstName,
               lastName,
               emailId,
               password
           },{withCredentials:true})
           console.log("signup",res.data);
           //adding userdata to store by dispatching add user action
           dispatch(addUser(res.data.data));
           return navigate("/profile");
        }
        catch(err){
          console.error("err",err);
          setError( err?.response?.data?.message ||
           err?.response?.data ||
           "Something went wrong!!")
        }
       }
  return (
   
 <div className="flex justify-center mt-10">
  <div className="bg-base-200 border border-base-300 rounded-box w-72 p-4">
    <h2 className="text-center text-lg font-semibold mb-6">
     {isLogin ? "Login": "Sign Up"}
    </h2>
    {!isLogin && <>
        <label className="label mt-2">First Name</label>
    <input
      type="text"
      className="input input-bordered rounded-lg w-full p-2 text-sm"
      placeholder="First Name"
      value={firstName}
      onChange={(e)=>setFirstName(e.target.value)}
    />
     <label className="label mt-2">Last Name</label>
    <input
      type="text"
      className="input input-bordered rounded-lg w-full p-2 text-sm"
      placeholder="Last Name"
      value={lastName}
      onChange={(e)=>setLastName(e.target.value)}
    />
    </>}
   
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
    
    <p className='text-red-600 text-sm'>{error}</p>
    <button className="btn btn-neutral w-full mt-6" onClick={isLogin ? handleLogin : handleSignUp}>
    {isLogin ?"Login":"Sign up"}
    </button>

    <p className='text-sm cursor-pointer py-4 mx-auto' onClick={()=>setLogin((value)=>!value)}> {!isLogin ? "Existing User? Login Here" :"New User? Sign Up here"}</p>
  </div>
</div>

  )
}

export default Login

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
        dispatch(addUser(res.data.data));
        return navigate("/");
     }
     catch(err){
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
        <div className="min-h-screen flex flex-col items-center justify-center bg-black px-4 pb-28 sm:pb-32 overflow-y-auto">
        <div className="bg-black/80 border border-pink-500 rounded-xl w-full max-w-sm p-6 sm:p-8 shadow-lg backdrop-blur-md">
          <h2 className="text-center text-2xl font-bold text-pink-400 mb-6">
            {isLogin ? "Login" : "Sign Up"}
          </h2>
      
          {!isLogin && (
            <>
              <input
                type="text"
                className="input input-bordered w-full mb-2 bg-black text-pink-400 placeholder-pink-300 border-pink-500 focus:border-pink-400 focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50 transition duration-300 mt-2 p-2"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
      
              <input
                type="text"
                className="input input-bordered w-full mb-2 bg-black text-pink-400 placeholder-pink-300 border-pink-500 focus:border-pink-400 focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50 transition duration-300 mt-2 p-2"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </>
          )}
      
          <input
            type="email"
            className="input input-bordered w-full mb-2 bg-black text-pink-400 placeholder-pink-300 border-pink-500 focus:border-pink-400 focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50 transition duration-300 mt-2 p-2"
            placeholder="Email"
            value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
          />
      
          <input
            type="password"
            className="input input-bordered w-full mb-2 bg-black text-pink-400 placeholder-pink-300 border-pink-500 focus:border-pink-400 focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50 transition duration-300 mt-2 p-2"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
      
          {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}
      
          <button
            className="btn w-full mt-4 bg-pink-500 hover:bg-pink-600 text-black font-bold"
            onClick={isLogin ? handleLogin : handleSignUp}
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
      
          <p
            className="text-sm text-pink-300 mt-4 text-center cursor-pointer hover:text-pink-400 transition"
            onClick={() => setLogin((prev) => !prev)}
          >
            {isLogin ? "New User? Sign Up here" : "Existing User? Login Here"}
          </p>
        </div>
      </div>
      
      );
}

export default Login

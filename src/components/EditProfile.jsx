import React,{useState} from 'react'
import axios  from 'axios';
import {useDispatch} from "react-redux";
import { addUser } from '../utils/userSlice';
import {useNavigate} from "react-router-dom";
import { BASE_URL } from '../utils/constants';
const EditProfile = ({user}) => {

const [firstName, setFirstName]=useState(user.firstName);
const [lastName, setLastName]=useState(user.lastName);
const [photoURL, setPhotoURL]=useState(user.photoURL);
const [age, setAge]=useState(user.age);
const [gender, setGender]=useState(user.gender);
const[about, setAbout]=useState(user.about);
const [error, setError]=useState("");
const [showToast, setShowToast]=useState(false);
const dispatch=useDispatch();
const saveProfile=async()=>{
    try{
    const res=await axios.patch("/api/profile/edit",{firstName, lastName, photoURL, age, gender, about}, { withCredentials:true})
    dispatch(addUser(res?.data?.data));
    setShowToast(true);
    setTimeout(()=>{
    setShowToast(false);
    },3000)
    }
    catch(err){
        console.log("FULL ERROR:", err);

        setError(
            err?.response?.data?.message ||
            err?.response?.data ||
            err.message
          );
    }
    
}
  return (
    <>
        <div className="flex justify-center mt-10">
  <div className="bg-base-200 border border-base-300 rounded-box w-96 p-4">
    <h2 className="text-center text-lg font-semibold mb-6">
     Edit Profile
    </h2>

    <label className="label">First Name</label>
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
      <label className="label mt-2">Age</label>
    <input
        type="number"
      className="input input-bordered rounded-lg w-full p-2 text-sm"
      placeholder="Age"
      value={age}
      onChange={(e)=>setAge(Number((e.target.value)))}
    />
        <label className="label mt-2">Gender</label>
    <input
         type="text"
      className="input input-bordered rounded-lg w-full p-2 text-sm"
      placeholder="Gender"
      value={gender}
      onChange={(e)=>setGender(e.target.value)}
    />
          <label className="label mt-2">About</label>
    <input
         type="text"
      className="input input-bordered rounded-lg w-full p-2 text-sm"
      placeholder="About"
      value={about}
      onChange={(e)=>setAbout(e.target.value)}
    />
            <label className="label mt-2">Photo</label>
    <input
         type="text"
      className="input input-bordered rounded-lg w-full p-2 text-sm"
      placeholder="Photo URL"
      value={photoURL}
      onChange={(e)=>setPhotoURL(e.target.value)}
    />
       <p className='text-red-600 text-sm'>{error}</p>
    <button className="btn btn-neutral w-full mt-6" onClick={()=>saveProfile()}>
      Edit Profile
    </button>
  </div>
</div>
{showToast && <div className="toast toast-top toast-center">
 
  <div className="alert alert-success">
    <span>Profile Saved Successfully.</span>
  </div>
</div>}

    </>

  )
}

export default EditProfile

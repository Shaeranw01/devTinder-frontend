import React from 'react'
import axios from "axios";
import {useDispatch} from "react-redux";
import { BASE_URL } from '../utils/constants';
import { removeUserFromFeed } from '../utils/feedSlice';
const UserCard = ({user}) => {
    const dispatch=useDispatch();
    const {_id, firstName,about,photoURL}=user;
    const handleSendRequest=async(status,userId)=>{
        try {
            const res = await axios.post(
              `${BASE_URL}/request/send/${status}/${userId}`,
              {},
              { withCredentials: true }
            );
      
            dispatch(removeUserFromFeed(userId));
          } catch (err) {
            console.error("ERROR sending request:", err);
          }
        }
  return (
    <div className='flex justify-center items-center'>
            <div className="card bg-base-300 w-96 shadow-sm justify-center items-center my-5">
    <figure className="px-10 pt-10">
      <img
        src={photoURL}
        alt="Photo"
        className="rounded-xl" />
    </figure>
    <div className="card-body items-center text-center">
      <h2 className="card-title">{firstName}</h2>
      <p>{about}</p>
      <div className="card-actions gap-4">
        <button className="btn btn-primary p-4 bg-pink-200" onClick={()=>handleSendRequest("ignored", _id)}>Ignore</button>
        <button className="btn btn-secondary p-4 bg-blue-100" onClick={()=>handleSendRequest("interested", _id)}>Interested</button>
      </div>
    </div>
  </div>
    </div>

  )
}

export default UserCard


import React, { useEffect } from 'react'
import axios from "axios";
import { BASE_URL } from '../utils/constants';
import {useDispatch, useSelector} from "react-redux";

import { addRequest,removeRequest } from '../utils/requestSlice';
const Requests = () => {
    const dispatch=useDispatch();
    const requests=useSelector(store=>store.request)
    const fetchRequests=async()=>{
        try {
            const res = await axios.get(
              BASE_URL + "/user/requests/received",
              { withCredentials: true }
            );
            console.log("req", res.data.data);
            dispatch(addRequest(res.data.data))

          } catch (err) {
            console.log("ERROR fetching connections:", err);
          }

    }

    const reviewRequests=async(status, _id)=>{
     try{
        const res=await axios.post(BASE_URL+"/request/review/"+status+"/"+_id,{},{withCredentials:true})
        dispatch(removeRequest(_id));
     }
     catch(err){
        console.log("ERROR fetching requests:", err);
     }
    }
    useEffect(()=>{
      
        fetchRequests();
    },[])
    if(!requests || requests.length===0) return  <h1 className='text-xl text-bold flex justify-center my-10'>No Requests Found</h1>
  return (
    <div>
      <h1 className='text-xl text-bold flex justify-center my-10'>Connection Requests</h1>
      {requests.map((request)=>{
        const {_id,firstName, lastName, gender, age, photoURL, about}=request.fromUserId;
        return (
            <div>
            <div key={_id} className="card card-side bg-pink-50 shadow-sm my-5 mx-auto w-1/2">
  <figure>
    <img
      src={photoURL}
      className='w-20 h-20 rounded-full mx-5'
      alt="Movie" />
  </figure>
  <div className="card-body">
    <h2 className="card-title text-bold text-xl">{firstName +" "+ lastName}</h2>
    <p>{age && gender && age + " " + gender}</p>
    <p>{about}</p>
    <div className="card-actions justify-end">
    <button className="btn btn-primary bg-pink-500 w-20" onClick={()=>reviewRequests("accepted", request._id)}>Accept</button>
<button className="btn btn-secondary bg-blue-300 w-20"onClick={()=>reviewRequests("rejected", request._id)}>Reject</button>
    </div>
  </div>
</div>
            </div>
        )
      })}
    </div>
  )
}

export default Requests

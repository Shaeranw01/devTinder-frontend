
import React, { useEffect,useState } from 'react'
import axios from "axios";
import { BASE_URL } from '../utils/constants';
import {useDispatch, useSelector} from "react-redux";

import { addRequest,removeRequest } from '../utils/requestSlice';
const Requests = () => {
    const dispatch=useDispatch();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const requests=useSelector(store=>store.request)
    const fetchRequests=async()=>{
        setLoading(true);
        setError("");
    
        try {
            const res = await axios.get(
              BASE_URL + "/user/requests/received",
              { withCredentials: true }
            );
       
            dispatch(addRequest(res.data.data))

          } catch (err) {
            if (err.response?.status === 401) {
              navigate("/login");
            } else {
              setError(
                err.response?.data?.message ||
                "Failed to fetch requests. Please try again."
              );
            }
          } finally {
            setLoading(false);
          } 

    }

    const reviewRequests=async(status, _id)=>{
        setError("");
     try{
        const res=await axios.post(BASE_URL+"/request/review/"+status+"/"+_id,{},{withCredentials:true})
        dispatch(removeRequest(_id));
     }
     catch(err){
        const statusCode = err.response?.status;
        const message = err.response?.data?.message;
    
        if (statusCode === 401) {
          navigate("/login");
          return;
        }
        setError(message || "Unable to process request");
     }
    }
    useEffect(()=>{
        fetchRequests();
    },[])
    if (error) {
        return (
          <h1 className="text-red-500 text-xl flex justify-center my-10">
            {error}
          </h1>
        );
      }
      
      if (!requests || requests.length === 0)
        return (
          <h1 className="text-pink-400 text-xl font-bold flex justify-center my-10">
            No Requests Found
          </h1>
        );
      
      return (
        <div>
          <h1 className="text-pink-400 text-2xl font-bold flex justify-center my-10">
            Connection Requests
          </h1>
      
          {requests.map((request) => {
            const { _id, firstName, lastName, gender, age, photoURL, about } = request.fromUserId;
            return (
              <div key={_id} className="flex justify-center">
                <div className="card card-side bg-black/40 backdrop-blur-md border border-pink-500 shadow-md hover:shadow-[0_0_20px_rgb(255,20,147)] transition-all duration-300 my-5 w-11/12 sm:w-1/2">
                  <figure className="px-5 py-4">
                    <img
                      src={photoURL}
                      className="w-20 h-20 rounded-full border-2 border-pink-500"
                      alt={`${firstName} ${lastName}`}
                    />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title text-pink-400 text-xl font-bold">{firstName + " " + lastName}</h2>
                    <p className="text-pink-300">{age && gender && age + " " + gender}</p>
                    <p className="text-pink-200">{about}</p>
                    <div className="card-actions justify-end gap-2 mt-2">
                    <button
                  className="btn bg-pink-500 text-white hover:bg-pink-600 hover:shadow-[0_0_15px_rgb(255,20,147)] transition w-24"
                  onClick={() => reviewRequests("accepted", request._id)}
                >
                  Accept
                </button>
                <button
                  className="btn bg-pink-700 text-white hover:bg-pink-800 hover:shadow-[0_0_15px_rgb(255,20,147)] transition w-24"
                  onClick={() => reviewRequests("rejected", request._id)}
                >
                  Reject
                </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      );
}

export default Requests

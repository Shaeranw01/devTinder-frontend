import React, { useEffect } from 'react'
import axios from "axios";
import { BASE_URL } from '../utils/constants';
import {useDispatch, useSelector} from "react-redux";
import { addConnection } from '../utils/connectionSlice';
const Connections = () => {
    const dispatch=useDispatch();
    const connections=useSelector(store=>store.connection)
    const fetchConnections=async()=>{
        try {
            const res = await axios.get(
              BASE_URL + "/user/requests/connections",
              { withCredentials: true }
            );
            console.log("res", res.data.data);
            dispatch(addConnection(res.data.data))

          } catch (err) {
            console.log("ERROR fetching connections:", err);
          }

    }
    useEffect(()=>{
        console.log("Connections component mounted");
        fetchConnections();
    },[])
    if(!connections || connections.length===0) return  <h1 className='text-xl text-bold flex justify-center my-10'>No Connections Found</h1>
  return (
    <div>
      <h1 className='text-xl text-bold flex justify-center my-10'>Connections</h1>
      {connections.map((connection)=>{
        const {_id,firstName, lastName, gender, age, photoURL, about}=connection;
        return (
   
            <div  key={_id} className="card card-side bg-pink-50 shadow-sm my-5 mx-auto w-1/2">
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
      <button className="btn btn-primary">Watch</button>
    </div>
  </div>
</div>
         
        )
      })}
    </div>
  )
}

export default Connections

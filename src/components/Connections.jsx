import React, { useEffect, useState } from 'react'
import axios from "axios";
import { BASE_URL } from '../utils/constants';
import {useDispatch, useSelector} from "react-redux";
import { addConnection } from '../utils/connectionSlice';
const Connections = () => {
    const dispatch=useDispatch();
    const connections=useSelector(store=>store.connection);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const fetchConnections=async()=>{
        setLoading(true);
        setError("");
        try {
            const res = await axios.get(
              BASE_URL + "/user/requests/connections",
              { withCredentials: true }
            );
            dispatch(addConnection(res.data.data))

          } catch (err) {
            setError(err?.response?.data?.message || "Something went wrong!");
          }finally {
            setLoading(false);
          }

    }
    useEffect(()=>{
        fetchConnections();
    },[])
    if (loading) return <p className="text-center text-pink-400 mt-10">Loading...</p>;
    if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;
    if (!connections || connections.length === 0) return <h1 className='text-xl font-bold text-pink-400 flex justify-center my-10'>No Connections Found</h1>

    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <h1 className='text-2xl font-bold text-center text-pink-400 mt-8 mb-6'>Connections</h1>
            {connections.map((connection) => {
                const {_id, firstName, lastName, gender, age, photoURL, about} = connection;
                return (
                    <div 
                      key={_id} 
                      className="card flex flex-col sm:flex-row bg-black bg-opacity-40 backdrop-blur-md border border-pink-500 rounded-xl my-5 mx-auto w-full sm:w-3/4 md:w-1/2 overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,105,180,0.7)]"
                    >
                        <figure className="flex justify-center items-center p-4 bg-black bg-opacity-50 sm:bg-transparent">
                            <img
                                src={photoURL}
                                className='w-24 h-24 rounded-full border-2 border-pink-400'
                                alt={`${firstName} ${lastName}`} 
                            />
                        </figure>
                        <div className="card-body flex-1 p-4 text-pink-200 text-center sm:text-left">
                            <h2 className="card-title text-xl font-bold mb-2 sm:mb-1">{firstName + " " + lastName}</h2>
                            <p className="text-sm text-pink-300 mb-1">{age && gender && age + " " + gender}</p>
                            <p className="text-pink-100">{about}</p>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Connections

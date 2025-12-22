import React, { useEffect } from 'react'
import axios from "axios"
import {useDispatch} from "react-redux";
import { addFeed, removeUserFromFeed } from '../utils/feedSlice';
import {useNavigate} from "react-router-dom";
import { BASE_URL } from '../utils/constants';
import {useSelector } from "react-redux";
import UserCard from './UserCard';
const Feed = () => {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const feed=useSelector(store=>store.feed);
    const getFeed=async()=>{
       if(feed.length>0) return ;
       try{
        const res=await axios.get(BASE_URL+"/feed", {withCredentials:true});
        dispatch(addFeed(res.data.data))
       }catch(err){
         //unauth user
         if(err?.response?.status===401){
           navigate("/login"); 
         }
   
        else navigate("/error")
       }
    }
  
    useEffect(()=>{
     getFeed();
    },[])
    return (
        <div className="flex flex-col items-center px-2 sm:px-4">
          {feed && feed.length > 0 ? (
            feed.map((user) => <UserCard key={user._id} user={user} />)
          ) : (
            <h2 className="text-center text-pink-400 my-10">
              No new users found!!
            </h2>
          )}
        </div>
      );
}

export default Feed

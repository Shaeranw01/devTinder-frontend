import React, { useEffect } from 'react'
import axios from "axios"
import {useDispatch} from "react-redux";
import { addFeed } from '../utils/feedSlice';
import {useNavigate} from "react-router-dom";
import { BASE_URL } from '../utils/constants';
import {useSelector } from "react-redux";
import UserCard from './UserCard';
const Feed = () => {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const feed=useSelector(store=>store.feed);
    console.log(feed);
    const getFeed=async()=>{
       if(feed.length>0) return ;
       try{
        const res=await axios.get(BASE_URL+"/feed", {withCredentials:true});
        console.log("feed", res.data);
        dispatch(addFeed(res.data))
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
    <div>
   { feed.length>0 && <UserCard user={feed[0]}/>}
    </div>
  )
}

export default Feed

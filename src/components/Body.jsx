import React from 'react'
import Navbar from './Navbar'
import {Outlet} from "react-router-dom";
import Footer from './Footer';
import { addUser } from '../utils/userSlice';
import {useDispatch} from "react-redux";
import { useEffect } from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import { BASE_URL } from '../utils/constants';
import {useSelector} from "react-redux";

const Body = () => {

  const dispatch=useDispatch();
  const navigate=useNavigate();
  const userData=useSelector(store=>store.user);

  const fetchUser=async()=>{
     //make an api call only when there is no data in store, if we already have  a user no need to make an api call on each page reload
    if(userData) return ;
    try{
      const res=await axios.get(BASE_URL+"/profile/view",{
        withCredentials:true
      })
      dispatch(addUser(res.data));
    }catch(err){
      //unauth user
      if(err.status===401){
        navigate("/login"); 
      }

     else navigate("/error")
    }

  }

  useEffect(()=>{
   

      fetchUser();

    
  },[])
  return (
    <div>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default Body

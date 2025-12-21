import React, { useEffect } from 'react'

import {useDispatch} from "react-redux";

import {useNavigate} from "react-router-dom";
import { BASE_URL } from '../utils/constants';
import {useSelector } from "react-redux";

import EditProfile from './EditProfile';
const Profile = () => {

    const user=useSelector(store=>store.user);
    console.log("profile", user);
  return (
    <div>
   {user && <EditProfile user={user}/>}
    </div>
  )
}

export default Profile

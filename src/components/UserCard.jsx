import React, { useState } from 'react';
import axios from "axios";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from '../utils/feedSlice';
import { BASE_URL } from '../utils/constants';
import { useNavigate } from "react-router-dom";

const UserCard = ({ user }) => {
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id, firstName, about, photoURL } = user;

  const handleSendRequest = async (status, userId) => {
    setError("");

    try {
      await axios.post(
        `${BASE_URL}/request/send/${status}/${userId}`,
        {},
        { withCredentials: true }
      );

      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      const statusCode = err.response?.status;
      const message = err.response?.data?.message;

      if (statusCode === 401) {
        navigate("/login");
        return;
      }
      if (statusCode === 400) {
        setError(message || "Unable to process request");
        return;
      }
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex justify-center px-4 sm:px-0">
      <div className="card flex flex-col items-center bg-black bg-opacity-40 backdrop-blur-md border border-pink-500 rounded-xl my-5 w-full sm:w-96 transform transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,105,180,0.7)]">
        <figure className="flex justify-center items-center p-6">
          <img
            src={photoURL}
            alt={firstName}
            className='w-28 h-28 rounded-full border-2 border-pink-400'
          />
        </figure>
        <div className="card-body text-center items-center text-pink-200 p-4 ">
          <h2 className="card-title text-center justify-center w-full text-pink-400 font-bold text-lg">
            {firstName}
          </h2>
          <p className="text-pink-100 mb-3">{about}</p>
          <div className="card-actions justify-center gap-4">
            <button
              className="btn btn-primary p-3 bg-pink-400 hover:bg-pink-500 text-black"
              onClick={() => handleSendRequest("ignored", _id)}
            >
              Ignore
            </button>
            <button
              className="btn btn-secondary p-3 bg-pink-600 hover:bg-pink-700 text-white"
              onClick={() => handleSendRequest("interested", _id)}
            >
              Interested
            </button>
          </div>
          {error && (
            <p className="text-red-500 text-sm mt-3">{error}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserCard;

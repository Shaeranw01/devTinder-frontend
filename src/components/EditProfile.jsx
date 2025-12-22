import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";


const EditProfile = ({ user }) => {
  const dispatch = useDispatch();
  

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [about, setAbout] = useState("");
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);

  // ✅ sync redux user → local state
  useEffect(() => {
    if (!user) return;

    setFirstName(user.firstName || "");
    setLastName(user.lastName || "");
    setPhotoURL(user.photoURL || "");
    setAge(user.age || "");
    setGender(user.gender || "");
    setAbout(user.about || "");
  }, [user]);

  const saveProfile = async () => {
    try {
      setError("");

      const res = await axios.patch(
        `/api/profile/edit`,
        { firstName, lastName, photoURL, age, gender, about },
        { withCredentials: true }
      );

      dispatch(addUser(res.data.data));

      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
        err?.response?.data ||
        err.message
      );
    }
  };

  // ✅ guard render
  if (!user) {
    return <p className="text-center text-pink-400 mt-10">Loading profile...</p>;
  }

 
  return (
    <>
      <div className="flex justify-center mt-10">
        <div className="bg-black bg-opacity-70 border border-pink-500 rounded-xl w-96 p-6 shadow-lg">
          <h2 className="text-center text-2xl font-bold text-pink-400 mb-6">
            Edit Profile
          </h2>

          <label className="label text-pink-300">First Name</label>
          <input
            className="input w-full p-2 rounded-lg mb-2 border-2 border-pink-500 focus:border-pink-400 focus:ring-2 focus:ring-pink-500 bg-black text-pink-200 placeholder-pink-600"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
          />

          <label className="label text-pink-300">Last Name</label>
          <input
            className="input w-full p-2 rounded-lg mb-2 border-2 border-pink-500 focus:border-pink-400 focus:ring-2 focus:ring-pink-500 bg-black text-pink-200 placeholder-pink-600"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
          />

          <label className="label text-pink-300">Age</label>
          <input
            type="number"
            className="input w-full p-2 rounded-lg mb-2 border-2 border-pink-500 focus:border-pink-400 focus:ring-2 focus:ring-pink-500 bg-black text-pink-200 placeholder-pink-600"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Age"
          />

          <label className="label text-pink-300">Gender</label>
          <input
            className="input w-full p-2 rounded-lg mb-2 border-2 border-pink-500 focus:border-pink-400 focus:ring-2 focus:ring-pink-500 bg-black text-pink-200 placeholder-pink-600"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            placeholder="Gender"
          />

<label className="label text-pink-300">About</label>
<textarea
  className="input w-full p-2 rounded-lg mb-2 border-2 border-pink-500 focus:border-pink-400 focus:ring-2 focus:ring-pink-500 bg-black text-pink-200 placeholder-pink-600 h-40 resize-none"
  value={about}
  onChange={(e) => setAbout(e.target.value)}
  placeholder="Tell something about yourself..."
/>

          <label className="label text-pink-300">Photo URL</label>
          <input
            className="input w-full p-2 rounded-lg mb-2 border-2 border-pink-500 focus:border-pink-400 focus:ring-2 focus:ring-pink-500 bg-black text-pink-200 placeholder-pink-600"
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
            placeholder="Photo URL"
          />

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          <button
            className="btn w-full mt-4 bg-pink-500 hover:bg-pink-400 text-black font-bold"
            onClick={saveProfile}
          >
            Edit Profile
          </button>
        </div>
      </div>

      {/* Toast */}
      {showToast && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-pink-500 text-black font-bold px-6 py-3 rounded-lg shadow-lg animate-bounce">
            Profile Saved Successfully!
          </div>
        </div>
      )}
    </>
  );
};


export default EditProfile;
import React from 'react'

const UserCard = ({user}) => {
    const {firstName,about,photoURL}=user;
  return (
    <div className='flex justify-center items-center'>
            <div className="card bg-base-300 w-96 shadow-sm justify-center items-center my-5">
    <figure className="px-10 pt-10">
      <img
        src={photoURL}
        alt="Photo"
        className="rounded-xl" />
    </figure>
    <div className="card-body items-center text-center">
      <h2 className="card-title">{firstName}</h2>
      <p>{about}</p>
      <div className="card-actions gap-4">
        <button className="btn btn-primary p-4 bg-pink-200">Ignore</button>
        <button className="btn btn-secondary p-4 bg-blue-100">Interested</button>
      </div>
    </div>
  </div>
    </div>

  )
}

export default UserCard

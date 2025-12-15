import React from "react";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-3xl font-bold mb-4">😕 Something went wrong</h1>
      <p className="mb-6 text-gray-600">
        We couldn’t load the data. Please try again later.
      </p>
      <button
        className="btn btn-neutral"
        onClick={() => navigate("/")}
      >
        Go Home
      </button>
    </div>
  );
};

export default ErrorPage;
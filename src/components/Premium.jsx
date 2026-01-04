import React from "react";

const Premium = () => {
  return (
    <div className="bg-black flex flex-col items-center justify-center px-4 mt-16 pb-28 sm:pb-32">
      <h1 className="text-3xl font-bold text-pink-400 mb-10">
        Choose Your Plan
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl w-full">
        {/* 🔶 GOLD PLAN */}
        <div className="relative bg-pink-500/10 backdrop-blur-md border border-pink-400/50 rounded-2xl p-6 shadow-lg hover:shadow-pink-500/40 transition duration-300 hover:-translate-y-1">
          <h2 className="text-2xl font-semibold text-pink-300 text-center mb-4">
            Gold Plan
          </h2>

          <ul className="space-y-3 text-gray-200 text-sm">
            <li>💬 Unlimited Chats</li>
            <li>💖 50 Connection Requests / day</li>
            <li>✔ Blue Tick Verification</li>
            <li>⏳ Valid for 30 Days</li>
          </ul>

          <button className="mt-6 w-full py-2 rounded-xl bg-pink-500 text-black font-semibold hover:bg-pink-400 hover:shadow-pink-500/50 transition">
            Choose Gold
          </button>
        </div>

        {/* ⚪ SILVER PLAN */}
        <div className="relative bg-white/5 backdrop-blur-md border border-pink-300/40 rounded-2xl p-6 shadow-lg hover:shadow-pink-400/30 transition duration-300 hover:-translate-y-1">
          <h2 className="text-2xl font-semibold text-pink-200 text-center mb-4">
            Silver Plan
          </h2>

          <ul className="space-y-3 text-gray-300 text-sm">
            <li>💬 20 Chats / day</li>
            <li>💖 10 Connection Requests / day</li>
            <li>✖ No Blue Tick</li>
            <li>⏳ Valid for 15 Days</li>
          </ul>

          <button className="mt-6 w-full py-2 rounded-xl bg-pink-400/80 text-black font-semibold hover:bg-pink-400 hover:shadow-pink-400/50 transition">
            Choose Silver
          </button>
        </div>
      </div>
    </div>
  );
};

export default Premium;

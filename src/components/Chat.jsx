import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { createSocketConnection}  from "../utils/socket";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Chat = () => {
    const socketRef = useRef(null);
  const { targetUserId } = useParams(); // receiver
  const loggedInUser = useSelector((store) => store.user);
  const userId=loggedInUser?._id;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const fetchChatMessages=async()=>{
    const chat=await axios.get(BASE_URL+"/chat/"+targetUserId,{withCredentials:true})
   const chatMessages=chat?.data?.messages.map(msg=>{
    const{senderId, text}=msg;

    return {
        firstName:senderId?.firstName, 
        lastName:senderId?.lastName, 
        text:text,
        senderId:senderId?._id,
        _id: msg._id,
     }

   })
   setMessages(chatMessages);
  }
  useEffect(()=>{
   fetchChatMessages();
  },[])

  //as soon as page loads the, socket connection made and join chat event emitted
  useEffect(()=>{
    if (!userId || !targetUserId) return;
    socketRef.current= createSocketConnection();
    socketRef.current.emit("joinChat",{firstName:loggedInUser.firstName, userId, targetUserId})
    socketRef.current.on("messageReceived", ({firstName,text, senderId })=>{
    setMessages((messages)=>[...messages, {firstName, text, senderId}])
    })
    return () => {
        socketRef.current.disconnect();
      };
  },[userId, targetUserId])


  const handleSend = () => {
    if (!newMessage.trim()) return;
    socketRef.current.emit("sendMessage", {firstName:loggedInUser.firstName, userId, targetUserId, text:newMessage})
    setNewMessage("");
  
  };

  return (
    <div className="flex justify-center px-4">
      <div className="flex flex-col w-full max-w-3xl min-h-[calc(100vh-16rem)] mt-6 mb-24 bg-black bg-opacity-40 border border-pink-500 rounded-xl backdrop-blur-md">
        
        {/* Header */}
        <div className="p-4 border-b border-pink-500 text-center text-pink-400 font-bold">
          Chat
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((msg) => {
            const isMe = msg.senderId === loggedInUser?._id;
            return (
              <div
               key={msg._id}
                className={`flex ${isMe ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[70%] px-4 py-2 rounded-2xl text-sm break-words ${
                    isMe
                      ? "bg-pink-500 text-white rounded-br-none"
                      : "bg-gray-800 text-pink-200 rounded-bl-none"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            );
          })}
          {/* <div ref={bottomRef} /> */}
        </div>

        {/* Input (footer-safe) */}
        <div className="sticky bottom-0 bg-black bg-opacity-90 backdrop-blur-md p-4 border-t border-pink-500 flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-black bg-opacity-50 border border-pink-500 rounded-full px-4 py-2 text-pink-200 focus:outline-none"
          
          />
          <button
           onClick={handleSend}
            className="bg-pink-500 hover:bg-pink-600 text-white px-6 rounded-full transition-all"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;

import { io } from "socket.io-client";

 const socket = io("https://multi-vendor-eccomerce-backend-1.onrender.com/", {
  withCredentials: true,
  transports: ["websocket"]  
 });
export default socket;
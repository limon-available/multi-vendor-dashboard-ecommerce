import { io } from "socket.io-client";

 const socket = io("https://backend-multi-vendor-ecommerce-xa4b.onrender.com", {
  withCredentials: true,
  transports: ["websocket"]  
 });
export default socket;
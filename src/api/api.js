import axios from "axios"
const api = axios.create({
    baseURL: 'https://multi-vendor-eccomerce-backend-1.onrender.com/api',
    withCredentials:true
})
export default api

//https://backend-multi-vendor-ecommerce-xa4b.onrender.com
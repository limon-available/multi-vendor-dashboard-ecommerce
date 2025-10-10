import axios from "axios"
const api = axios.create({
    baseURL:'http://localhost:5000/api'
})
export default api

//https://backend-multi-vendor-ecommerce-xa4b.onrender.com
import axios from "axios";

const API = axios.create({baseURL:"http://localhost:5000/api/v1"});

API.interceptors.request.use((req)=>{
    if(localStorage.getItem('profile')){ 
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }
    return req;  
})

export const getUser = (userId)=>API.get(`/user/${userId}`)

export const getAllUser = ()=>API.get('/user')

export const updateUser = (userId,formData)=>API.put(`/user/${userId}`,formData)

export const followUser = (id,data) => API.put(`user/follow/${id}`,data)

export const unFollowUser = (id,data) => API.put(`user/unfollow/${id}`,data)
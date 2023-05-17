import axios from "axios";

const API = axios.create({baseURL:"http://localhost:5000/api/v1"});

export const getTimeLinePosts = (id)=>API.get(`/post/timeline/${id}`)


export const likePost = (postId,userId) => API.put(`/post/like/${postId}`,{userId:userId})

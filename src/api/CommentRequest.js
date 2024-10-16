import axios from "axios";

const API = axios.create({baseURL:"http://localhost:5000/api/v1"});

export const getPostComment = (id)=>API.get(`/comment/post/${id}`)

export const addComment = (data)=>API.post('/comment',data)


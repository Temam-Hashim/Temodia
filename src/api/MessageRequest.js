import axios from "axios";

// Set up the base URL for the API
const API = axios.create({ baseURL: "http://localhost:5000/api/v1" });

// Fetch messages for a specific chat
export const getMessages = (id) => API.get(`/message/${id}`);

// Add a new message
export const addMessage = (data) => API.post(`/message/`, data);

// Update message status (sent, delivered, read)
export const updateMessageStatus = (messageId, status) =>
  API.patch(`/message/status`, { messageId, status });

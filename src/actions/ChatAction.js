import * as ChatApi from "../api/ChatRequest.js";

// Action to get user chats
export const getChats = (id) => async (dispatch) => {
  dispatch({ type: "CHAT_START" });
  try {
    const { data } = await ChatApi.userChats(id);
    dispatch({ type: "CHAT_SUCCESS", data: data });
    console.log("action chat", data)
  } catch (error) {
    dispatch({ type: "CHAT_FAIL" });
    console.log(error);
  }
};

// Action to create a chat
export const createChat = (senderId, receiverId) => async (dispatch) => {
  dispatch({ type: "CREATE_START" });
  try {
    const { data } = await ChatApi.createChat(senderId, receiverId);
    dispatch({ type: "CREATE_SUCCESS", data: data });
  } catch (error) {
    dispatch({ type: "CREATE_FAIL" });
    console.log(error);
  }
};

const initialState = {
  chats: [], // Stores the list of chats
  loading: false, // Indicates if data is being fetched
  error: false, // Indicates if there was an error
  uploading: false, // Indicates if chat creation is in progress
};

const ChatReducer = (state = initialState, action) => {
  switch (action.type) {
    
    // Fetching chats
    case "CHAT_START":
      return { ...state, loading: true, error: false };
    case "CHAT_SUCCESS":
      return { ...state, chats: action.data, loading: false, error: false };
    case "CHAT_FAIL":
      return { ...state, loading: false, error: true };

    // Creating a new chat
    case "CREATE_START":
      return { ...state, uploading: true, error: false };
    case "CREATE_SUCCESS":
      return {
        ...state,
        chats: [...state.chats, action.data], // Add the newly created chat to the existing list
        uploading: false,
        error: false,
      };
    case "CREATE_FAIL":
      return { ...state, uploading: false, error: true };

    default:
      return state;
  }
};

export default ChatReducer;

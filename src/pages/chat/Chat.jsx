import React, { useRef, useState, useEffect } from "react";
import "./Chat.css";
import { io } from "socket.io-client";
import Conversation from "../../components/conversation/Conversation";
import LogoSearch from "../../components/logoSearch/LogoSearch";
import NavIcons from "../../components/navIcons/NavIcons";
import { userChats } from "../../api/ChatRequest";
import ChatBox from "../../components/chatBox/ChatBox";
import { useDispatch, useSelector } from "react-redux";
import AddChatModal from "../../components/addChatModal/AddChatModal";
import * as USERS from "../../api/UserRequest.js";
import { getChats } from "../../actions/ChatAction.js";

const Chat = () => {
  const socket = useRef();
  const user = useSelector((state) => state.AuthReducer.authData.data);
  // const [chats, setChats] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [sendMessage, setSendMessage] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState(null);
  const [isChatOpen, setChatOpen] = useState(false); // For small device nav toggle
  const [modalOpened, setModalOpened] = useState(false);
  const [usersData, setUsersData] = useState([]);
  const dispatch = useDispatch();

    useEffect(() => {
      const fetchAllUsers = async () => {
        const lists = await USERS.getAllUser();
        setUsersData(lists.data);
      };
      fetchAllUsers();
    }, []);

    const  {chats} = useSelector((state)=>state.ChatReducer);
          console.log("latest chat", chats);

  useEffect(() => {
      dispatch(getChats(user._id))
  }, [user?._id]);

  useEffect(() => {
    socket.current = io("http://localhost:8800");
    socket.current.emit("newUser", user?._id);
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(users);
    });
  }, [user]);

  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit("sendMessage", sendMessage);
    }
  }, [sendMessage]);

  useEffect(() => {
    socket.current.on("receiveMessage", (data) => {
      console.log("received Message from socket", data);
      setReceivedMessage(data);
    });
  }, []);

  const checkOnlineStatus = (chat) => {
    const chatMember = chat?.members.find((member) => member !== user?._id);
    const online = onlineUsers.find((user) => user.userId === chatMember);
    return online ? true : false;
  };

  return (
    <>
      <div className="Chat">
        {/* Left Side Chat */}
        <div className={`Left-side-chat ${isChatOpen ? "open" : ""}`}>
          <LogoSearch />
          <div className="Chat-container">
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h2>Chats</h2>
              <button
                className="button add-button"
                onClick={() => setModalOpened(!modalOpened)}
              >
                New
              </button>
            </div>
            <div className="Chat-list">
              {chats?.data.map((chat) => (
                <div
                  key={chat._id}
                  onClick={() => {
                    setCurrentChat(chat);
                    setChatOpen(false);
                  }}
                >
                  <Conversation
                    data={chat}
                    currentUser={user?._id}
                    online={checkOnlineStatus(chat)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side Chat */}
        <div className={`Right-side-chat ${isChatOpen ? "shifted" : ""}`} id="right-side">
          <div style={{ width: "100%", textAlign: "right" }}>
            <NavIcons />
            <hr
              style={{
                width: "95%",
                border: "0.1px solid #ececec",
                marginTop: "20px",
              }}
            />
          </div>
          <ChatBox
            chat={currentChat}
            currentUser={user?._id}
            setSendMessage={setSendMessage}
            receivedMessage={receivedMessage}
            online={checkOnlineStatus(currentChat)}
            socket={socket.current}
          />
        </div>

        {/* Hamburger Menu for Small Devices */}
        <div className="chat-navbar">
          <button
            className="hamburger"
            onClick={() => setChatOpen(!isChatOpen)}
          >
            <span className="line"></span>
            <span className="line"></span>
            <span className="line"></span>
          </button>
        </div>
      </div>
      <AddChatModal
        modalOpened={modalOpened}
        setModalOpened={setModalOpened}
        data={usersData}
        setCurrentChat={setCurrentChat}
      />
    </>
  );
};

export default Chat;

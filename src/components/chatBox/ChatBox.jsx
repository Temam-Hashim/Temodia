import React, { useEffect, useState, useRef } from "react";
import {
  addMessage,
  getMessages,
  updateMessageStatus,
} from "../../api/MessageRequest";
import { getUser } from "../../api/UserRequest";
import "./ChatBox.css";
import { format } from "timeago.js";
import InputEmoji from "react-input-emoji";

const ChatBox = ({
  chat,
  currentUser,
  setSendMessage,
  receivedMessage,
  online,
  socket,
}) => {
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const scroll = useRef();
  const imageRef = useRef();

  const handleChange = (newMessage) => {
    setNewMessage(newMessage);
  };

  // Fetch user data for the chat header
  useEffect(() => {
    const userId = chat?.members?.find((id) => id !== currentUser);
    const getUserData = async () => {
      try {
        const { data } = await getUser(userId);
        setUserData(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (chat) getUserData();
  }, [chat, currentUser]);

  // Fetch messages for the current chat
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await getMessages(chat._id);
        setMessages(data.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (chat) fetchMessages();
  }, [chat]);

  // Scroll to the last message
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle sending messages
  const handleSend = async (e) => {
    e.preventDefault();

    if (!newMessage.trim()) return; // Prevent sending empty messages

    // Prepare the message object
    const message = {
      senderId: currentUser,
      text: newMessage,
      chatId: chat._id,
    };

    const receiverId = chat.members.find((id) => id !== currentUser);

    // Send message to socket server
    setSendMessage({ ...message, receiverId });

    // Optimistically update the UI by adding the message to the messages state
    setMessages((prevMessages) => [...prevMessages, message]);

    // Clear the input field
    setNewMessage("");

    // Send message to the database
    try {
      const response = await addMessage(message);
      // After adding the message, update its status to "delivered"
      await updateMessageStatus(response.data.data._id, "delivered");
      // Update the message status in the state to "delivered"
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg === message
            ? { ...msg, status: "delivered", _id: response.data.data._id }
            : msg
        )
      );
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // Handle received messages
 // Update message status for received messages
  useEffect(() => {
    if (receivedMessage && receivedMessage.chatId === chat?._id) {
      // Add the received message to the message list
      setMessages((prevMessages) => [...prevMessages, receivedMessage]);

      // Mark the message as read if it's not from the current user
      if (receivedMessage.senderId !== currentUser) {
        updateMessageStatus(receivedMessage._id, "read");  // Update status in the backend

        if (socket) {
          socket.emit("messageRead", { ...receivedMessage, status: "read" });  // Notify the sender via socket
        } else {
          console.warn("Socket is not defined.");
        }
      }
    }
  }, [receivedMessage, currentUser, chat?._id, socket]);

  // Handle real-time message status updates (delivered, read)
  useEffect(() => {
    if (!socket) return;

    // Listen for delivered message updates
    socket.on("messageDelivered", (updatedMessage) => {
      handleStatusUpdate(updatedMessage);
    });

    // Listen for read message updates
    socket.on("messageRead", (updatedMessage) => {
      handleStatusUpdate(updatedMessage);
    });

    return () => {
      // Clean up socket listeners
      socket.off("messageDelivered");
      socket.off("messageRead");
    };
  }, [socket]);

  // Update message status in the UI
  const handleStatusUpdate = (updatedMessage) => {
    setMessages((prevMessages) =>
      prevMessages.map((message) =>
        message._id === updatedMessage._id
          ? { ...message, status: updatedMessage.status }
          : message
      )
    );
  };

  // Mark messages as read when the chat is opened or focused
  useEffect(() => {
    if (chat && messages.length > 0) {
      const unreadMessages = messages.filter(
        (message) =>
          message.senderId !== currentUser && message.status !== "read"
      );

      if (unreadMessages.length > 0) {
        unreadMessages.forEach((message) => {
          updateMessageStatus(message._id, "read"); // Update message status in the backend
        });

        // Emit 'messageRead' event to socket
        if (socket) {
          unreadMessages.forEach((message) => {
            socket.emit("messageRead", { ...message, status: "read" });
          });
        } else {
          console.warn("Socket is not defined.");
        }
      }
    }
  }, [chat, messages, currentUser, socket]);

  return (
    <div className="ChatBox-container">
      {chat ? (
        <>
          {/* Chat Header */}
          <div className="chat-header">
            <div className="followers">
              <div>
                <img
                  src={
                    userData?.profilePicture
                      ? process.env.REACT_APP_PUBLIC_FOLDER +
                        userData.profilePicture
                      : process.env.REACT_APP_PUBLIC_FOLDER +
                        "default_profile.png"
                  }
                  alt="Profile"
                  className="followerImage"
                />
                <div className="name" style={{ fontSize: "0.9rem" }}>
                  <span>
                    {userData?.firstName ? userData?.firstName +
                      " " +
                      userData?.lastName: "No Name"}
                  </span>
                  <span
                    style={{
                      color: online ? "#e82cf5" : "",
                      fontWeight: "bold",
                      fontStyle: "italic",
                    }}
                  >
                    {online ? "Online" : "Offline"}
                  </span>
                </div>
              </div>
            </div>
            <hr
              style={{
                width: "95%",
                border: "0.1px solid #ececec",
                marginTop: "20px",
              }}
            />
          </div>
          {/* Chat Body */}
          <div className="chat-body">
            {messages.map((message) => (
              <div
                key={message?._id}
                ref={scroll}
                className={
                  message.senderId === currentUser ? "message own" : "message"
                }
              >
                <span>{message.text}</span>
                <span>{format(message.createdAt)}</span>
                <span className="message-status">
                  {message.status === "read" ? (
                    <i
                      className="fas fa-check-double"
                      style={{ color: "#0084ff" }}
                    ></i>
                  ) : message.status === "delivered" ? (
                    <i className="fas fa-check-double"></i>
                  ) : (
                    <i className="fas fa-check"></i>
                  )}
                </span>
              </div>
            ))}
          </div>
          {/* Chat Sender */}
          <div className="chat-sender">
            <div onClick={() => imageRef.current.click()}>+</div>
            <InputEmoji value={newMessage} onChange={handleChange} />
            <div className="send-button button" onClick={handleSend} du>
              Send
            </div>
            <input type="file" style={{ display: "none" }} ref={imageRef} />
          </div>
        </>
      ) : (
        <span className="chatbox-empty-message">
          Tap on a chat to start a conversation...
        </span>
      )}
    </div>
  );
};

export default ChatBox;

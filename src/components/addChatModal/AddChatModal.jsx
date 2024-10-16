import { Modal, useMantineTheme } from "@mantine/core";
import "./AddChatModal.css";
import { useEffect, useState } from "react";
import { createChat, userChats } from "../../api/ChatRequest";
import { useDispatch, useSelector } from "react-redux";
import { getChats } from "../../actions/ChatAction";


function AddChatModal({ modalOpened, setModalOpened, data, setCurrentChat }) {
  const theme = useMantineTheme();
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.AuthReducer.authData.data);
  const { chats } = useSelector((state) => state.ChatReducer);

  // Step 1: Safely extract member IDs from chats or use an empty array if chats.data doesn't exist
  const allChatMembers = (chats.data || []).flatMap((chat) => chat.members);

  // Step 2: Filter users whose _id is not in allChatMembers
  const usersNotInChats = data.filter(
    (user) => !allChatMembers.includes(user._id)
  );

  data  = usersNotInChats.filter(user=>user._id !== currentUser._id)

  const handleCreateChat = (id) => {
    setModalOpened(false);
    // Dispatch action to create a new chat with the selected user
    const { data } = dispatch(createChat(currentUser._id, id));
    // Set the newly created chat as the current chat
    setCurrentChat(data);
    // Close the modal after successful chat creation
    setModalOpened(false);

  };

  useEffect(() => {
    dispatch(getChats(currentUser._id));
  }, [currentUser._id, chats]);

  return (
    <Modal
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
      overlayOpacity={0.82}
      overlayBlur={3}
      size={window.innerWidth >= 699 ? "55%" : "100%"}
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
    >
      {/* Modal content */}
      <div className="modal-body">
      <h2>Friends List</h2>
      
        {
            data.length===0 ? "You don't more friends to chat with" :
            data.map((person, index) => (
          <div
            key={index}
            className="follower"
            onClick={() => handleCreateChat(person._id)}
          >
            <img
              src={
                person.profilePicture
                  ? PF + person.profilePicture
                  : PF + "default_profile.png"
              }
              alt="profile"
              className="followerImg"
            />
            <div className="followerDetails">
              <div className="name">
                <span>
                  {person?.firstName
                    ? person?.firstName + " " + person?.lastName
                    : "No Name"}
                </span>
              </div>
              <div className="username">
                <span>@{person.username}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
}

export default AddChatModal;

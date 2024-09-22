import { useState, useEffect } from "react";

import { useApi } from "../services/ChatService";
import Contact from "./Contact";
import UserLayout from "../layouts/UserLayout";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function AllUsers({
  users,
  chatRooms,
  setChatRooms,
  onlineUsersId,
  currentUser,
  changeChat,
}) {
  const [selectedChat, setSelectedChat] = useState();
  const [nonContacts, setNonContacts] = useState([]);
  const [contactIds, setContactIds] = useState([]);
  const {
    initiateSocketConnection,
    getAllUsers,
    getUser,
    getChatRooms,
    getChatRoomOfUsers,
    createChatRoom,
    getMessagesOfChatRoom,
    sendMessage,
  } = useApi();

  useEffect(() => {
    const Ids = chatRooms.map((chatRoom) => {
      return chatRoom.members.find((member) => member !== currentUser._id);
    });
    setContactIds(Ids);
  }, [chatRooms, currentUser._id]);

  useEffect(() => {
    setNonContacts(
      users.filter(
        (f) => f._id !== currentUser._id && !contactIds.includes(f._id)
      )
    );
  }, [contactIds, users, currentUser._id]);

  const changeCurrentChat = (index, chat) => {
    setSelectedChat(index);
    changeChat(chat);
  };

  const handleNewChatRoom = async (user) => {
    const members = {
      senderId: currentUser._id,
      receiverId: user._id,
    };
    const res = await createChatRoom(members);
    setChatRooms((prev) => [...prev, res]);
    changeChat(res);
  };

  return (
    <>
      <ul className="overflow-auto h-[30rem]">
        <h2 className="my-2 mb-2 ml-2 text-gray-900 ">Chats</h2>
        <li>
          {chatRooms?.map((chatRoom, index) => (
            <div
              key={index}
              className={classNames(
                index === selectedChat
                  ? "bg-gray-100 dark:bg-gray-700"
                  : "transition duration-150 ease-in-out cursor-pointer bg-white border-b border-gray-200 hover:bg-gray-100 dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-700",
                "flex items-center px-3 py-2 text-sm "
              )}
              onClick={() => changeCurrentChat(index, chatRoom)}
            >
              <Contact
                chatRoom={chatRoom}
                onlineUsersId={onlineUsersId}
                currentUser={currentUser}
              />
            </div>
          ))}
        </li>
        <h2 className="my-2 mb-2 ml-2 text-gray-900 ">
          Other Users
        </h2>
        <li>
          {nonContacts.map((nonContact, index) => (
            <div
              key={index}
              className="flex items-center px-3 py-2 text-sm bg-white border-b border-gray-200 hover:bg-gray-100 dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-700 cursor-pointer"
              onClick={() => handleNewChatRoom(nonContact)}
            >
              <UserLayout user={nonContact} onlineUsersId={onlineUsersId} />
            </div>
          ))}
        </li>
      </ul>
    </>
  );
}

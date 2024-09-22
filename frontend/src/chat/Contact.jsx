import { useState, useEffect } from "react";

import { useApi } from "../services/ChatService";
import UserLayout from "../layouts/UserLayout";

export default function Contact({ chatRoom, onlineUsersId, currentUser }) {
  const [contact, setContact] = useState();
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
    const contactId = chatRoom.members?.find(
      (member) => member !== currentUser._id
    );

    const fetchData = async () => {
      const res = await getUser(contactId);
      setContact(res);
    };

    fetchData();
  }, [chatRoom, currentUser]);

  return <UserLayout user={contact} onlineUsersId={onlineUsersId} />;
}

// Contact.jsx
import { useState, useEffect } from "react";
import { useApi } from "../services/ChatService";
import UserLayout from "../layouts/UserLayout";

export default function Contact({ chatRoom, onlineUsersId, currentUser }) {
    const [contact, setContact] = useState();
    const [isRead, setIsRead] = useState(true); // Default to true

    const {
        getUser,
        getMessagesOfChatRoom,
    } = useApi();

    useEffect(() => {
      if (!chatRoom) return;
        const contactId = chatRoom.members?.find(
            (member) => member !== currentUser?._id
        );

        const fetchData = async () => {
            const res = await getUser(contactId);
            setContact(res);

            // Fetch messages to determine if they are read or not
            const messages = await getMessagesOfChatRoom(chatRoom._id);
            const unreadMessages = messages.filter(msg => msg.isRead === false && msg.sender !== currentUser?._id);
            setIsRead(unreadMessages.length === 0); // Set isRead based on unread messages
        };

        fetchData();
    }, [chatRoom, currentUser]);

    return <UserLayout user={contact} onlineUsersId={onlineUsersId} isRead={isRead} />;
}

import { useState, useEffect } from "react";
import { useApi } from "../services/ChatService";
import UserLayout from "../layouts/UserLayout";

export default function Contact({ chatRoom, onlineUsersId, currentUser }) {
    const [contact, setContact] = useState();
    const {
        getUser,
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

    // Get the last message to check if it's read
    const lastMessage = chatRoom.messages?.[chatRoom.messages.length - 1];
    const isRead = lastMessage ? lastMessage.isRead : true; // Default to true if no messages

    return <UserLayout user={contact} onlineUsersId={onlineUsersId} isRead={isRead} />;
}

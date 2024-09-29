import { useState, useEffect, useRef } from "react";
import { useApi } from "../services/ChatService";
import Message from "./Message";
import Contact from "./Contact";
import ChatForm from "./ChatForm";

export default function ChatRoom({ currentChat, currentUser, socket }) {
    const [messages, setMessages] = useState([]);
    const [incomingMessage, setIncomingMessage] = useState(null);
    const messagesEndRef = useRef(); // Ref to scroll to the bottom of the messages

    const {
        getMessagesOfChatRoom,
        sendMessage,
    } = useApi();

    // Fetch messages when the current chat changes
    useEffect(() => {
        const fetchData = async () => {
            const res = await getMessagesOfChatRoom(currentChat._id);
            setMessages(res);

        };

        if (currentChat) {
            fetchData();
        }
    }, [currentChat, getMessagesOfChatRoom]);

    useEffect(() => {
        // Scroll to the bottom whenever messages change
        //scrollToBottom();
    }, [messages]);

    // Scrolls the chat container to the bottom
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        // Listening for incoming messages
        socket.current?.on("getMessage", (data) => {
            setIncomingMessage({
                senderId: data.senderId,
                message: data.message,
            });
        });
    }, [socket]);

    useEffect(() => {
        // Update messages with incoming messages
        if (incomingMessage) {
            setMessages((prev) => [...prev, incomingMessage]);
        }
    }, [incomingMessage]);

    const handleFormSubmit = async (message) => {
        const receiverId = currentChat.members.find(
            (member) => member !== currentUser._id
        );

        // Emit the message to the socket
        socket.current.emit("sendMessage", {
            senderId: currentUser._id,
            receiverId: receiverId,
            message: message,
        });

        const messageBody = {
            chatRoomId: currentChat._id,
            sender: currentUser._id,
            message: message,
            isRead: false, // Initially set to false
        };

        const res = await sendMessage(messageBody);
        setMessages((prev) => [...prev, res]);
    };

    return (
        <div className="lg:col-span-2 lg:block">
            <div className="w-full">
                <div className="p-3 bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700">
                    <Contact chatRoom={currentChat} />
                </div>
                <div className="relative w-full p-6 overflow-y-auto h-[30rem] bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700">
                    <ul className="space-y-2">
                        {messages.map((message, index) => (
                            <Message key={index} message={message} self={currentUser._id} />
                        ))}
                    </ul>
                    {/* Invisible div to serve as a scroll target */}
                    <div ref={messagesEndRef} />
                </div>
                <ChatForm handleFormSubmit={handleFormSubmit} />
            </div>
        </div>
    );
}

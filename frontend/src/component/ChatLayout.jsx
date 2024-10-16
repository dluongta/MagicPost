import { useEffect, useRef, useState } from "react";
import Helmet from "react-helmet";
import { useApi } from "../services/ChatService";
import { useAuth } from "../contexts/AuthContext";
import ChatRoom from "../chat/ChatRoom";
import Welcome from "../chat/Welcome";
import AllUsers from "../chat/AllUsers";
import SearchUsers from "../chat/SearchUsers";
import Header from "../layouts/HeaderChat";
import axios from "axios";

export default function ChatLayout() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [chatRooms, setChatRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [currentChat, setCurrentChat] = useState();
  const [onlineUsersId, setOnlineUsersId] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isContact, setIsContact] = useState(false);

  const socket = useRef();
  const scrollRef = useRef();

  const { currentUser } = useAuth();
  const {
    initiateSocketConnection,
    getAllUsers,
    getChatRooms,
  } = useApi();

  useEffect(() => {
    const getSocket = async () => {
      const res = await initiateSocketConnection();
      socket.current = res;
      socket.current.emit("addUser", currentUser._id);
      socket.current.on("getUsers", (users) => {
        const userId = users.map((u) => u[0]);
        setOnlineUsersId(userId);
      });
    };
    getSocket();
  }, [currentUser._id]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getChatRooms(currentUser._id);
      setChatRooms(res);
    };
    fetchData();
  }, [currentUser._id]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getAllUsers();
      setUsers(res);
    };
    fetchData();
  }, []);

  useEffect(() => {
    setFilteredUsers(users);
    setFilteredRooms(chatRooms);
  }, [users, chatRooms]);

  useEffect(() => {
    if (isContact) {
      setFilteredUsers([]);
    } else {
      setFilteredRooms([]);
    }
  }, [isContact]);

  const handleChatChange = async (chat) => {
    setCurrentChat(chat);
    try {
      // Mark messages as read when changing chat
      await axios.put(`/api/message/mark-as-read/${chat._id}`, {});
    } catch (error) {
      console.error("Error marking messages as read:", error);
    }
  };

  const handleSearch = (newSearchQuery) => {
    setSearchQuery(newSearchQuery);
    const searchedUsers = users.filter((user) =>
      user.email?.toLowerCase().includes(newSearchQuery.toLowerCase())
    );

    const searchedUsersId = searchedUsers.map((u) => u._id);
    if (chatRooms.length !== 0) {
      chatRooms.forEach((chatRoom) => {
        const isUserContact = chatRoom.members.some(
          (e) => e !== currentUser._id && searchedUsersId.includes(e)
        );
        setIsContact(isUserContact);

        isUserContact
          ? setFilteredRooms([chatRoom])
          : setFilteredUsers(searchedUsers);
      });
    } else {
      setFilteredUsers(searchedUsers);
    }
  };

  return (
    <>
      <Header />
      <div className="container mx-auto">
        <div className="min-w-full bg-white border-x border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700 rounded lg:grid lg:grid-cols-3">
          <div className="bg-white border-r border-gray-200 dark:bg-gray-900 dark:border-gray-700 lg:col-span-1">
            <SearchUsers handleSearch={handleSearch} />
            <AllUsers
              users={searchQuery !== "" ? filteredUsers : users}
              chatRooms={searchQuery !== "" ? filteredRooms : chatRooms}
              setChatRooms={setChatRooms}
              onlineUsersId={onlineUsersId}
              currentUser={currentUser}
              changeChat={handleChatChange}
            />
          </div>

          {currentChat ? (
            <ChatRoom
              currentChat={currentChat}
              currentUser={currentUser}
              socket={socket}
              scrollRef={scrollRef}
            />
          ) : (
            <Welcome />
          )}
        </div>
      </div>
    </>
  );
}
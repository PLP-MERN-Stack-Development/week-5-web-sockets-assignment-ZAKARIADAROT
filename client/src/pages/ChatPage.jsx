import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useSocket } from "../context/SocketContext";
import { fetchMessages, fetchUsers } from "../services/api";
import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";
import MessageInput from "../components/MessageInput";
import PrivateChatModal from "../components/PrivateChatModal";
import { useNotifications } from "../hooks/useNotifications";

const ChatPage = () => {
  const { username } = useAuth();
  const { socket } = useSocket();
  const { showNotification, playSound } = useNotifications();

  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [typingUsers, setTypingUsers] = useState([]);

  const [privateModalOpen, setPrivateModalOpen] = useState(false);
  const [privateRecipient, setPrivateRecipient] = useState(null);
  const [privateMessages, setPrivateMessages] = useState({});
  const [unreadCounts, setUnreadCounts] = useState({});

  useEffect(() => {
    if (socket && username) {
      socket.emit("user_join", username);

      socket.on("receive_message", (msg) => setMessages((prev) => [...prev, msg]));
      socket.on("user_list", (list) => setUsers(list));
      socket.on("typing_users", (list) => setTypingUsers(list));

      socket.on("private_message", (msg) => {
        setPrivateMessages((prev) => {
          const updated = { ...prev };
          if (!updated[msg.senderId]) updated[msg.senderId] = [];
          updated[msg.senderId].push(msg);
          return updated;
        });

        setUnreadCounts((prev) => ({
          ...prev,
          [msg.senderId]: (prev[msg.senderId] || 0) + 1,
        }));

        showNotification(`New message from ${msg.sender}`, msg.message);
        playSound();
      });

      fetchMessages().then((res) => setMessages(res.data));
      fetchUsers().then((res) => setUsers(res.data));

      return () => {
        socket.off("receive_message");
        socket.off("user_list");
        socket.off("typing_users");
        socket.off("private_message");
      };
    }
  }, [socket, username]);

  const sendPublicMessage = (text) => {
    socket.emit("send_message", { message: text });
  };

  const handleTyping = (isTyping) => {
    socket.emit("typing", isTyping);
  };

  const openPrivateChat = (user) => {
    setPrivateRecipient(user);
    setPrivateModalOpen(true);
    setUnreadCounts((prev) => ({ ...prev, [user.socketId]: 0 }));
  };

  const sendPrivateMessage = (text) => {
    if (privateRecipient) {
      socket.emit("private_message", {
        to: privateRecipient.socketId,
        message: text,
      });

      setPrivateMessages((prev) => {
        const updated = { ...prev };
        if (!updated[privateRecipient.socketId]) updated[privateRecipient.socketId] = [];
        updated[privateRecipient.socketId].push({
          sender: username,
          senderId: socket.id,
          message: text,
        });
        return updated;
      });
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar
        users={users}
        socketId={socket.id}
        onUserClick={openPrivateChat}
        unreadCounts={unreadCounts}
      />
      <div className="flex-1 flex flex-col">
        <ChatWindow messages={messages} typingUsers={typingUsers} />
        <MessageInput onSend={sendPublicMessage} onTyping={handleTyping} />
      </div>
      <PrivateChatModal
        isOpen={privateModalOpen}
        onClose={() => setPrivateModalOpen(false)}
        recipient={privateRecipient}
        messages={privateMessages[privateRecipient?.socketId] || []}
        onSend={sendPrivateMessage}
      />
    </div>
  );
};

export default ChatPage;

import { useEffect, useRef } from "react";

const ChatWindow = ({ messages, typingUsers }) => {
  const bottomRef = useRef();

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, typingUsers]);

  return (
    <div className="flex-1 overflow-y-auto p-4 bg-gray-100">
      {messages.map((msg) => (
        <div key={msg._id || msg.id} className="mb-2 flex items-center">
          <span className="flex-1">
            <strong>{msg.sender}</strong>: {msg.message}
          </span>
          {msg.reaction && <span className="ml-2">{msg.reaction}</span>}
          {msg.read && <span className="text-xs text-green-600 ml-2">✓ Read</span>}
        </div>
      ))}
      {typingUsers.length > 0 && (
        <p className="text-gray-500">{typingUsers.join(", ")} typing...</p>
      )}
      <div ref={bottomRef} />
    </div>
  );
};

export default ChatWindow;

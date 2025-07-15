import { useState, useEffect, useRef } from "react";

const PrivateChatModal = ({ isOpen, onClose, recipient, onSend, messages }) => {
  const [message, setMessage] = useState("");
  const bottomRef = useRef();

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (!isOpen) return null;

  const handleSend = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSend(message);
      setMessage("");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white w-96 rounded-lg shadow-lg flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-bold">Chat with {recipient.username}</h2>
          <button onClick={onClose} className="text-red-500 font-bold">X</button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2 max-h-80">
          {messages.map((msg) => (
            <div
              key={msg._id || msg.id}
              className={`p-2 rounded ${
                msg.senderId === recipient.socketId ? "bg-gray-200" : "bg-blue-100"
              }`}
            >
              <strong>{msg.sender}</strong>: {msg.message}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        <form onSubmit={handleSend} className="flex p-4 border-t">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 border rounded p-2"
            placeholder="Type a message..."
          />
          <button className="ml-2 bg-blue-500 text-white px-4 rounded">Send</button>
        </form>
      </div>
    </div>
  );
};

export default PrivateChatModal;

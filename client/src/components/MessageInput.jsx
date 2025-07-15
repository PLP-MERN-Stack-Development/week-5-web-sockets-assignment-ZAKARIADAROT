import { useState } from "react";

const MessageInput = ({ onSend, onTyping }) => {
  const [message, setMessage] = useState("");

  const handleSend = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSend(message);
      setMessage("");
    }
  };

  const handleTyping = () => {
    onTyping(message.length > 0);
  };

  return (
    <form onSubmit={handleSend} className="p-4 flex">
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyUp={handleTyping}
        placeholder="Type a message"
        className="flex-1 border rounded p-2"
      />
      <button className="ml-2 bg-blue-500 text-white px-4 rounded">
        Send
      </button>
    </form>
  );
};

export default MessageInput;

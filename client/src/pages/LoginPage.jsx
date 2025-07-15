import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const LoginPage = () => {
  const [name, setName] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (name.trim()) {
      login(name);
      navigate("/chat");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-xl shadow-lg w-80"
      >
        <h1 className="text-2xl font-bold mb-4">Join Chat</h1>
        <input
          type="text"
          placeholder="Enter username"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border w-full p-2 rounded mb-4"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded w-full"
        >
          Join
        </button>
      </form>
    </div>
  );
};

export default LoginPage;

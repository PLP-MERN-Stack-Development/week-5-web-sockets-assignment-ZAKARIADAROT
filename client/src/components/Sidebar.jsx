const Sidebar = ({ users, socketId, onUserClick, unreadCounts }) => {
  return (
    <div className="w-1/4 bg-gray-800 text-white p-4">
      <h2 className="text-xl font-bold mb-4">Online Users</h2>
      <ul>
        {users.map((u) => (
          <li
            key={u.socketId}
            className="cursor-pointer hover:bg-gray-700 p-2 rounded flex justify-between"
            onClick={() => onUserClick(u)}
          >
            {u.username} {u.socketId === socketId && "(You)"}
            {unreadCounts[u.socketId] > 0 && (
              <span className="bg-red-500 text-white text-xs px-2 rounded">
                {unreadCounts[u.socketId]}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;

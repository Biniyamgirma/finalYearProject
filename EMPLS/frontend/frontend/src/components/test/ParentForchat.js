import React, { useState } from 'react';
import ChatPage from './ChatPage';
import Sidebar from '../sidebar/Sidebar';
const ParentForChat = () => {
  const [friends] = useState([
    { id: 'friend1', name: 'Alice' },
    { id: 'friend2', name: 'Bob' },
  ]);
  const [messages, setMessages] = useState({
    friend1: [
      { id: 1, text: 'Hello!', sender: 'friend1', timestamp: '12:34 PM' },
      { id: 2, text: 'Hi!', sender: 'me', timestamp: '12:35 PM' },
    ],
    friend2: [
      { id: 3, text: 'Hey!', sender: 'friend2', timestamp: '1:00 PM' },
    ],
  });
  const currentUserId = 'me';

  const handleSendMessage = (text, friendId) => {
    const newMessage = {
      id: Date.now(),
      text,
      sender: currentUserId,
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages((prev) => ({
      ...prev,
      [friendId]: [...(prev[friendId] || []), newMessage],
    }));
  };

  return (
    <div className="container1">
    <Sidebar />
        

      <ChatPage
        friends={friends}
        messages={messages}
        onSendMessage={handleSendMessage}
        currentUserId={currentUserId}
      />
    </div>
    
  );
};

export default ParentForChat;
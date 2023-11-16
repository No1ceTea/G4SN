// components/Chat.tsx
import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { useClerk } from '@clerk/nextjs';

interface Message {
  user: string;
  text: string;
}

interface ChatProps {
  user: string;
}

const Chat: React.FC<ChatProps> = ({ user }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');
  const [socket, setSocket] = useState<SocketIOClient.Socket | null>(null);
  const clerk = useClerk();

  useEffect(() => {
    const newSocket = io('http://localhost:3000'); // Remplacez l'URL par l'URL de votre serveur Socket.io
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on('message', (message: Message) => {
        setMessages([...messages, message]);
      });
    }
  }, [socket, messages]);

  const sendMessage = () => {
    if (newMessage.trim() !== '') {
      const messageObject: Message = {
        user,
        text: newMessage,
      };
      socket?.emit('sendMessage', messageObject);
      setMessages([...messages, messageObject]);
      setNewMessage('');
    }
  };

  return (
    <div>
      <div style={{ height: '300px', overflowY: 'scroll', border: '1px solid #ccc' }}>
        {messages.map((message, index) => (
          <div key={index}>
            <strong>{message.user}:</strong> {message.text}
          </div>
        ))}
      </div>
      <input
        type="text"
        placeholder="Type your message..."
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
      <p>Connected as: {clerk.user?.email}</p>
    </div>
  );
};

export default Chat;

import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import './Message.css'; 


const socket = io("http://localhost:3000"); // Use your server URL here

function Chat() {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages((msgs) => [...msgs, message]);
        });

        return () => socket.off('message');
    }, []);

    const sendMessage = () => {
        socket.emit('sendMessage', message);
        setMessage('');
    };

    return (
        <div className="chat-container">
          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div key={index}>{msg}</div>
            ))}
          </div>
          <div className="chat-input-container">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      );
}

export default Chat;
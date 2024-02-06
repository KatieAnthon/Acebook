import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import './Message.css';
import { getUserInfo } from "../../services/authentication";
import { getPostById } from "../../services/posts";

function Chat({ postId, onClose }) {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [userInfo, setUserInfo] = useState(null);
    const [post, setPost] = useState([]);
    const [token, setToken] = useState(window.localStorage.getItem("token"));
    const [socket, setSocket] = useState(null);
    const [isChatVisible, setIsChatVisible] = useState(false);


    
    useEffect(() => {
        if (token) {
            const newSocket = io("http://localhost:3000", {
                query: {
                    token,
                },
            });
            setSocket(newSocket);

            const fetchData = async () => {
                try {
                    const userInfoData = await getUserInfo(token);
                    setUserInfo(userInfoData);
                } catch (err) {
                    console.error('Error fetching user information:', err);
                }
                try {
                    const postsData = await getPostById(token, postId);
                    setPost(postsData);
                } catch (err) {
                    console.error('Error fetching posts:', err);
                }
            };

            fetchData();

            newSocket.on('message', (message) => {
                if (message) {
                   console.log(message)
                }
                setMessages((msgs) => [...msgs, message]);
            });

            // Return cleanup function that removes event listener and closes socket
            return () => {
                newSocket.off('message');
                newSocket.close();
            };
        }
    }, [token, postId]);

    useEffect(() => {
        // Cleanup useEffect for when component unmounts or socket changes
        return () => {
            if (socket) {
                socket.off('message');
                socket.close();
            }
        };
    }, [socket]); // This useEffect listens for changes to the socket state

    const sendMessage = () => {
        if (message && userInfo && post && socket) {
            const recipientId = post.post.user;
            // console.log(userInfo.userid, recipientId)
            socket.emit('sendMessage', {
                message: message,
                senderId: userInfo.userid,
                recipientId: recipientId,
                postId: post.post._id,
            });
            setMessage('');
        }
    };

    return (
      <div className="chat-container">
          <div className="chat-header">
              <button onClick={onClose} className="close-btn">X</button>
          </div>
          <div className="chat-messages">
              {messages.map((msg, index) => (
                  <div key={index} className="message">{userInfo.username}: {msg.message}</div>
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

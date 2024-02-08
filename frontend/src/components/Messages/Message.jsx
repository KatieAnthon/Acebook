import { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import './Message.css';
import { getUserInfo } from "../../services/authentication";
import { getPostById } from "../../services/posts";

function Chat({ postId, onClose }) {
    const [message, setMessage] = useState('');
    const socketRef = useRef(null);
    const [userInfo, setUserInfo] = useState(null);
    const [post, setPost] = useState(null);
    const [token, setToken] = useState(window.localStorage.getItem("token"));
    const [socket, setSocket] = useState(null);
    const [isChatVisible, setIsChatVisible] = useState(false); 
    const [chatMessages, setChatMessages] = useState([]);
    
    useEffect(() => {
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
          setupSocket();
        } catch (err) {
          console.error('Error fetching posts:', err);
        }
      };
    
      if (token) {
        fetchData();
      } 
    function setupSocket() {
      const newSocket = io("http://localhost:3000", { query: { token } });
      setSocket(newSocket);
      socketRef.current = newSocket;
      
      newSocket.on('message', (newMessage) => {
        setIsChatVisible(true);
        setChatMessages((prevMessages) => {
          if (!prevMessages.length || !prevMessages.some(msg => msg._id === newMessage._id)) {
            return [...prevMessages, newMessage];
          } else {
            return prevMessages;
          }
        });
      });
  
      return () => {
        newSocket.off('message');
        newSocket.close();
      };
    }
  }, [token, postId]);

  const sendMessage = () => {
    if (message && userInfo && post?.post && socketRef.current) {
        const { user, username, userPorfilePicture, _id } = post.post; // Destructure for clarity
        socketRef.current.emit('sendMessage', {
            message,
            senderId: userInfo.userid,
            senderUsername: userInfo.username,
            receiverUsername: username,
            recipientId: user,
            postId: _id,
            userPicture: userInfo.profilePic,
            receiverPicture: userPorfilePicture
        });
        setMessage('');
    }
};

    return (
      <div className="chat-container">
          <div className="chat-header">
              <img src={post?.post?.userPorfilePicture ? `http://localhost:3000/${post?.post?.userPorfilePicture}` : 'default-picture-url'} alt="msg" width="60px" height="60px" className="rounded-circle mr-3"></img>
              <button onClick={onClose} className="close-btn">X</button>
          </div>
          <div className="chat-messages">
              {chatMessages.map((msg, index) => (
                <div
                  key={index}
                  className={`message ${msg.senderUsername === userInfo.username ? 'sent' : 'received'}`}
                >
                  <div className="message-username">
                    {msg.senderUsername === userInfo.username ? 'You' : msg.senderUsername}
                  </div>
                  {msg.message}
                  {post.username}
                </div>    
              ))}
          </div>
          <div className="chat-input-container">
              <input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type a message..."
              />
             <button type="button" onClick={sendMessage}>Send</button>
          </div>
      </div>
  );
}


export default Chat;

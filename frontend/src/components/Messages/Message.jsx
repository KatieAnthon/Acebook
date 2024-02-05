import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import './Message.css';
import { getUserInfo } from "../../services/authentication";
import { getPostById } from "../../services/posts";


function Chat({ postId }) {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [userInfo, setUserInfo] = useState(null);
    const [post, setPost] = useState([]);
    const [token, setToken] = useState(window.localStorage.getItem("token"));
    
    // Initialize socket connection outside of useEffect to avoid multiple connections
    const socket = io("http://localhost:3000", {
        query: {
            token,
        },
    });

    useEffect(() => {
        const fetchData = async () => {
            if (token) {
                try {
                    const userInfoData = await getUserInfo(token); // Fetch user info
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
            }
        };

        fetchData();

        socket.on('message', (message) => {
            setMessages((msgs) => [...msgs, message]);
        });

        // Cleanup function to run when component unmounts
        return () => {
            socket.off('message');
            socket.close(); // Properly close the socket connection
        };
    }, [token, postId]); // Dependency array includes token

    const sendMessage = () => {
        if (message && userInfo && post) { // Check if message is not empty and userInfo is available
            socket.emit('sendMessage', {
                senderId: post.post.user, // Use user's ID from fetched userInfo
                senderUsername: userInfo.username,
                recipientId: post.post.username, // This needs to be dynamically set based on the chat context
                text: message,
                postId: post.post._id, // This should be set based on the current post context if applicable
            });
            setMessage(''); 
        }
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

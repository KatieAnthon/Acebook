import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getPosts} from "../../services/posts";
import { getUserInfo } from "../../services/authentication";
import { createPost } from '../../services/posts'; 
import Post from "../../components/Post/Post";
import PostForm from "../../components/Post/PostForm";
import NavBar from "../../components/NavBar"
import Liked from "../../components/LikeButton";



export const FeedPage = () => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {


    const fetchData = async () => {
      if (token) {
        try {
          const userInfoData = await getUserInfo(token);
          setUserInfo(userInfoData);
        } catch (err) {
          console.error('Error fetching user information:', err);
        }
  
        try {
          const postsData = await getPosts(token);
          setPosts(postsData.posts);
        } catch (err) {
          console.error('Error fetching posts:', err);
        }
      } else {
        console.log('No token found, navigating to login.');
        navigate("/login");
        <script>function loginFirst() {
        alert("LOG IN FIRST") //needs fixing
      }</script>
      }
    };
  
    fetchData();

  }, [token, navigate]);

  const handlePostSubmit = async (newPostContent) => {
    try {
      await createPost(token, { message: newPostContent });
      
      const updatedPosts = await getPosts(token);
      setPosts(updatedPosts.posts);
    } catch (err) {
      console.error('Error creating post:', err.message);
    }
  };

  return (
    <>
      <NavBar />
      <h2>New Post</h2>
        {/* Display User Information */}
    {userInfo && userInfo.profilePic && (
      <div className="user-info">
        <h3>User Information</h3>
        <p>Username: {userInfo.username}</p>
        <p>Email: {userInfo.email}</p>
        <img src={`http://localhost:3000/${userInfo.profilePic}`} alt="Profile" />
      </div>
    )}
      <PostForm onSubmit={handlePostSubmit} />
      <div className="feed" role="feed">
        {posts.map((post) => (
          <Post post={post} key={post._id}
          />
        ))}
        
      </div>
    </>
  );
};

export default FeedPage;

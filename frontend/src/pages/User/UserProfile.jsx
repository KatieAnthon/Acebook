import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { deletePost } from '../../services/posts'; // import your deletePost function

import { getPosts} from "../../services/posts";
import { getUserInfo } from "../../services/authentication";
import { getSinglePost} from "../../services/posts";
import { createPost } from '../../services/posts'; 
import Post from "../../components/Post/Post";
import PostForm from "../../components/Post/PostForm";
import NavBar from "../../components/NavBar"


export const UserProfile = () => {
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
          const postsData = await getSinglePost(token);
          setPosts(postsData.posts);
        } catch (err) {
          console.error('Error fetching posts:', err);
        }
      } else {
        console.log('No token found, navigating to login.');
        navigate("/login");
      }
    };
  
    fetchData();
  }, [token, navigate]);

  const handlePostSubmit = async (newPostContent, imageFile) => {
    try {
      await createPost(token, { message: newPostContent, image: imageFile });
      
      const updatedPosts = await getSinglePost(token);
      setPosts(updatedPosts.posts);
    } catch (err) {
      console.error('Error creating post:', err.message);
    }
  };

  const handleDelete = async (postId) => {
    try {
      await deletePost(token, postId);
      const updatedPosts = posts.filter(post => post._id !== postId);
      setPosts(updatedPosts);
    } catch (err) {
      console.error('Error deleting post:', err.message);
    }
  };


  return (
    <>
      <NavBar />
      <h2>New Post</h2>
      {userInfo && userInfo.profilePic && (
      <div className="user-info">
        <h3>User Information</h3>
        <p>Username: {userInfo.username}</p>
        <p>Email: {userInfo.email}</p>
         <img src={`http://localhost:3000/${userInfo.profilePic}`} alt="Profile" />
      </div>
    )}
    
      <PostForm onSubmit={handlePostSubmit} />
    {/* ... UserInfo and PostForm components ... */}
    <div className="feed" role="feed">
        {posts.map((post) => (
          <div key={post._id}>
            <Post post={post} />
            <button onClick={() => handleDelete(post._id)}>Delete Post</button>
          </div>
        ))}
      </div>
    </>
  );
};

export default UserProfile;

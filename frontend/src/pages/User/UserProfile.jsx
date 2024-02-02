import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { deletePost } from '../../services/posts'; // import your deletePost function

import { getUserInfo } from "../../services/authentication";

import { getSinglePost} from "../../services/posts";
import { createPost } from '../../services/posts'; 
import Post from "../../components/Post/Post";
import PostForm from "../../components/Post/PostForm";
import NavBar from "../../components/NavBar"
import UserInfo from "../../components/UserInfo"

import "../../components/Post/Post.css";


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

  const handlePostSubmit = async (formData) => {
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }
    console.log(formData)
    try {
      await createPost(token, formData);
      
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
      {userInfo && (
      <UserInfo
        userName={userInfo.username || 'Default Username'} 
        userEmail={userInfo.email || 'Default Email'} 
        userPicture={userInfo.profilePic ? `http://localhost:3000/${userInfo.profilePic}` : 'default-picture-url'} 
        />
      )}   
    
    <PostForm onSubmit={handlePostSubmit} />
    <div className="feed" role="feed">
      {posts.map((post) => (
      <Post key={post._id} post={post} onDelete={() => handleDelete(post._id)} showDeleteButton={true} />
      ))}
    </div>
    </>
  );
};

export default UserProfile;
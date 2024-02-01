import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { deletePost } from '../../services/posts'; // import your deletePost function

import UserInfo from "../../components/UserInfo"
import { getUserInfo } from "../../services/authentication";
import { getSinglePost} from "../../services/posts";
import { createPost } from '../../services/posts';
import { updatePost } from "../../services/posts";
import Post from "../../components/Post/Post";
import PostForm from "../../components/Post/PostForm";
import NavBar from "../../components/NavBar"


export const UserProfile = () => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [userInfo, setUserInfo] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editPostId, setEditPostId] = useState(null);
  const [editedContent, setEditedContent] = useState('');

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
  
  const handleEditClick = (post) => {
    setIsEditing(true);
    setEditPostId(post._id);
    setEditedContent(post.message);
  };
  
  const handleEditSubmit = async (updatedContent) => {
    try {
      await updatePost(token, editPostId, { message: updatedContent });
      const updatedPosts = posts.map(post => 
        post._id === editPostId ? { ...post, message: updatedContent } : post
      );
      setPosts(updatedPosts);
      setIsEditing(false);
      setEditPostId(null);
      setEditedContent('');
    } catch (err) {
      console.error('Error updating post:', err.message);
    }
  };

  return (
    <>
      <NavBar />
      {userInfo && (
      <UserInfo
        userName={userInfo.username || 'Default Username'} 
        userEmail={userInfo.email || 'Default Email'} 
        userPicture={userInfo.profilePic ? `http://localhost:3000/${userInfo.profilePic}` : 'default-picture-url'} 
        />
      )}   
      {isEditing ? (
  <PostForm onSubmit={handleEditSubmit} initialContent={editedContent} />
) : (
  <PostForm onSubmit={handlePostSubmit} />
)}  
    <div className="feed" role="feed">
        {posts.map((post) => (
          <div key={post._id}>
            <Post post={post} />
            <button onClick={() => handleDelete(post._id)}>Delete Post</button>
             <button onClick={() => handleEditClick(post)}>Edit Post</button>
          </div>
        ))}
      </div>
    </>
  );
};

export default UserProfile;

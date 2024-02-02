import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { deletePost } from '../../services/posts'; // import your deletePost function

import { getUserInfo } from "../../services/authentication";
import { getSinglePost} from "../../services/posts";
import { createPost } from '../../services/posts';
import { updatePost } from '../../services/posts'; 
import Post from "../../components/Post/Post";
import PostForm from "../../components/Post/PostForm";
import NavBar from "../../components/NavBar"
import UserInfo from "../../components/UserInfo"
import '../../App.css'

export const UserProfile = () => {
const [posts, setPosts] = useState([]);
const [token, setToken] = useState(window.localStorage.getItem("token"));
const [userInfo, setUserInfo] = useState(null);
const [isEditModalOpen, setIsEditModalOpen] = useState(false);
const [selectedPost, setSelectedPost] = useState(null);
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

  const handleDelete = async (postId) => {
    try {
      await deletePost(token, postId);
      const updatedPosts = posts.filter(post => post._id !== postId);
      setPosts(updatedPosts);
    } catch (err) {
      console.error('Error deleting post:', err.message);
    }

    
  };
  const handleEdit = (post) => {
      setSelectedPost(post);
      setIsEditModalOpen(true);
    };

    // Example usage in a component
    const handlePostSubmit = async (formData, initialData) => {
      try {
        if (initialData) {
          // If initialData exists, it's an update
          await updatePost(token, initialData._id, formData);
        } else {
          // If initialData is null, it's a new post
          await createPost(token, formData);
        }
  
        // Update the posts after creating or updating a post
        const updatedPosts = await getSinglePost(token);
        setPosts(updatedPosts.posts);
  
        setIsEditModalOpen(false);// Optionally, you can reset the form state or perform additional logic
      } catch (error) {
        console.error('Error submitting post:', error.message);
        // Handle the error, e.g., display an error message to the user
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
          <div key={post._id}>
            <Post post={post} />
            <button onClick={() => handleDelete(post._id)}>Delete Post</button>
            <button onClick={() => handleEdit(post)}>Edit Post</button>
          </div>
        ))}
      </div>
      {/* Edit Post Modal */}
    {isEditModalOpen && (
    <div className="edit-post-modal-overlay">
    <div className="edit-post-modal">
      <PostForm initialData={selectedPost} onSubmit={handlePostSubmit} />
      <button onClick={() => setIsEditModalOpen(false)}>Close</button>
    </div>
  </div>
  )}
    </>
  );
};

export default UserProfile;
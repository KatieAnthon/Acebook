import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { deletePost } from '../../services/posts'; 
import { getUserInfo } from "../../services/authentication";
import { addCommentToPost } from "../../services/comments";
import { getSinglePost} from "../../services/posts";
import { createPost } from '../../services/posts';
import { updatePost } from '../../services/posts'; 
import Post from "../../components/Post/Post";
import PostForm from "../../components/Post/PostForm";
import NavBar from "../../components/NavBar/NavBar"
import UserInfo from "../../components/Userinfo/UserInfo"
import Introduction from "../../components/Introduction/Introduction"
import '../../App.css'
import "../../components/Post/Post.css";


export const UserProfile = () => {
const [posts, setPosts] = useState([]);
const [token, setToken] = useState(window.localStorage.getItem("token"));
const [userInfo, setUserInfo] = useState(null);
const [isEditModalOpen, setIsEditModalOpen] = useState(false);
const [selectedPost, setSelectedPost] = useState(null);

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

  const focusCommentForm = (postId) => {
    const form = document.getElementById(`comment-form-${postId}`); 
    form.scrollIntoView({ behavior: 'smooth' });
    form.querySelector('textarea').focus();
  }

  const handleEdit = (post) => {
      setSelectedPost(post);
      setIsEditModalOpen(true);
    };

  const handlePostSubmit = async (formData, initialData) => {
    try {
      if (initialData) {
        await updatePost(token, initialData._id, formData);
      } else {
        await createPost(token, formData);
      }
      const updatedPosts = await getSinglePost(token);
      setPosts(updatedPosts.posts);
      setIsEditModalOpen(false);
    } catch (error) {
      console.error('Error submitting post:', error.message);
    }
  };


  const handleCommentSubmit = async (postId, commentText) => {
      try {
        const commentResponse = await addCommentToPost(token, postId, commentText);
        const newComment = commentResponse.comment; 
    
        setPosts(currentPosts => currentPosts.map(post => {
          if (post._id === postId) {
            const comments = Array.isArray(post.comments) ? post.comments : [];
            return { ...post, comments: [...comments, newComment] };
          }
          return post;
        }));
      } catch (err) {
        console.error('Error adding comment:', err.message);
      }
    };


  return (
    <>
      <NavBar />
      <Introduction pageName={"Profile"}/>
      {userInfo && (
      <UserInfo
        userName={userInfo.username || 'Default Username'} 
        userEmail={userInfo.email || 'Default Email'} 
        userPicture={userInfo.profilePic ? `http://localhost:3000/${userInfo.profilePic}` : 'default-picture-url'} 
        />
      )}   
    
    <PostForm onSubmit={handlePostSubmit} />
    <div className="feed" role="feed">
    {posts.slice().reverse().map((post) => (
          <Post
            key={post._id}
            post={post}
            onDelete={() => handleDelete(post._id)}
            onEdit={() => handleEdit(post)}
            showDeleteButton={true}
            onCommentSubmit={handleCommentSubmit}
            focusCommentForm={() => focusCommentForm(post._id)}
            currentUserInfo={userInfo}
          />
        ))}
      </div>
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
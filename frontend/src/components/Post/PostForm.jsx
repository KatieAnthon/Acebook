
import React, { useState, useEffect, useRef} from 'react';
import './PostForm.css'; 
import { getUserInfo } from "../../services/authentication";

const photoUpload = (
  <svg 
  xmlns="http://www.w3.org/2000/svg" 
  width="16" 
  height="16" 
  fill="green" 
  class="bi bi-image-fill" 
  viewBox="0 0 16 16">
  <path d="M.002 3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-12a2 2 0 0 1-2-2zm1 9v1a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062zm5-6.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0"/>
</svg>
)


const PostForm = ({ onSubmit, initialData }) => {
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [userInfo, setUserInfo] = useState(null);
  const fileInputRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        try {
          const userInfoData = await getUserInfo(token);
          setUserInfo(userInfoData);
        } catch (err) {
          console.error('Error fetching user information:', err);
        }
      } else {
        console.log('No token found, navigating to login.');
        navigate("/login");
      }
    };
    fetchData();

    if (initialData) {
      setContent(initialData.message || ''); // Adjust property name if needed
      setImage(initialData.postImage );
    }
  }, [token, initialData]);

  const handleContentChange = (event) => {
    setContent(event.target.value);

  };

  const handleImageChange = () => {
    const file = fileInputRef.current.files[0];
    console.log('Selected file:', file); // Add this line for debugging
    setImage(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const file = fileInputRef.current.files[0];
    // console.log(file, image)
    if (image) {
      formData.append('image', image);
    }
    try {
      await onSubmit(formData, initialData); 
      setContent('');
      setImage(null);
    } catch (error) {
      console.error('Error submitting post:', error.message);
    }
  };
  
  return (
        <div className="post-form-container">
        <form onSubmit={handleSubmit} className="post-form" id="post-form">
          <div className="form-content">
            <img
              src={userInfo?.profilePic ? `http://localhost:3000/${userInfo?.profilePic}` : 'default-picture-url'}
              alt="User Avatar"
              className="user-avatar"
            />
            <textarea
              value={content}
              placeholder={userInfo ? `What are you thinking ${userInfo.username}?` : "What are you thinking?"}
              className="post-textarea"
              onChange={handleContentChange}
              name="content"
            />
            <label htmlFor="file-upload" className="custom-file-upload">
            {photoUpload}
            </label>
            <input id="file-upload" type="file" className="post-input-file"  name="image"   ref={fileInputRef} accept="image/*" onChange={handleImageChange} />
          </div>
          <button type="submit" className="post-submit-button">
            {initialData ? 'Update Post' : 'Create Post'}
          </button>
        </form>
      </div>
    );
};

export default PostForm;
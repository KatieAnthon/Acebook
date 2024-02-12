
import React, { useState, useEffect, useRef} from 'react';
import './PostForm.css'; 
import { getUserInfo } from "../../services/authentication";

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
            📷
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
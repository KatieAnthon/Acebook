import React, { useState } from 'react';
import './PostForm.css'; 

const PostForm = ({ onSubmit }) => {
  const [newPost, setNewPost] = useState('');

  const handlePostSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    formData.append('newPost', newPost);

    const imageFile = formData.get('image');
    onSubmit(formData);
    setNewPost('');
  };

  return (
    <div className="post-form-container">
      <form onSubmit={handlePostSubmit} className="post-form">
        <textarea value={newPost} onChange={(e) => setNewPost(e.target.value)} name="content" className="post-textarea"/>
        <input type="file" accept="image/*" name="image" className="post-input-file"/>
        <button type="submit" className="post-submit-button">Post</button>
      </form>
    </div>
  );
};

export default PostForm;
import React, { useState } from 'react';

const PostForm = ({ onSubmit }) => { // Accept onSubmit as a prop
  const [newPost, setNewPost] = useState('');

  const handlePostSubmit = async (event) => {
    event.preventDefault();
    onSubmit(newPost); // Use the passed onSubmit function
    setNewPost(''); // Clear the form
  };

  return (
    <form onSubmit={handlePostSubmit}>
      <textarea value={newPost} onChange={(e) => setNewPost(e.target.value)} />
      <button type="submit">Post</button>
    </form>
  );
};

export default PostForm;

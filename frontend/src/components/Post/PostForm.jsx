import React, { useState } from 'react';

const PostForm = ({ onSubmit }) => { // Accept onSubmit as a prop
  const [newPost, setNewPost] = useState('');
  const [imagePost, setImagePost] = useState(null);

  const handlePostSubmit = async (event) => {
    event.preventDefault();
    const postData = {
      content: newPost,
      image: imagePost,
    };
    onSubmit(postData); // Use the passed onSubmit function
    setNewPost(''); // Clear the form
    setImagePost(null);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImagePost(file)
  }

  return (
    <form onSubmit={handlePostSubmit}>
      <textarea value={newPost} onChange={(e) => setNewPost(e.target.value)} />
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button type="submit">Post</button>
    </form>
  );
};

export default PostForm;

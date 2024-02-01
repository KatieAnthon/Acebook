import React, { useState } from 'react';

const PostForm = ({ onSubmit }) => {
  const [newPost, setNewPost] = useState('');

  const handlePostSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    formData.append('newPost', newPost);

    const imageFile = formData.get('image');
    // if (imageFile) {
    //   console.log('Image file:', imageFile, 'Image file name:', imageFile.name);
    //   // This log will show you the file object and its name
    // }
    onSubmit(formData);
    setNewPost('');
  };

  return (
    <form onSubmit={handlePostSubmit}>
      <textarea value={newPost} onChange={(e) => setNewPost(e.target.value)} name="content" />
      <input type="file" accept="image/*" name="image" />
      <button type="submit">Post</button>
    </form>
  );
};

export default PostForm;

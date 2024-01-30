import React, { useState } from 'react';

const PostForm = () => {
  const [newPost, setNewPost] = useState('');

  const handlePostSubmit = async () => {
    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: newPost }),
      });

      const responseData = await response.json();
      const newToken = responseData.token;

      console.log('New Token:', newToken);

      setNewPost('');

      console.log('Post submitted successfully:', responseData.message);
    } catch (error) {
      console.error('Error submitting post:', error.message);
    }
  };

  return (
    <div>
      <textarea value={newPost} onChange={(e) => setNewPost(e.target.value)} />
      <button onClick={handlePostSubmit}>Post</button>
    </div>
  );
};

export default PostForm;

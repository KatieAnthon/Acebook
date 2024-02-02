
import React, { useState } from 'react';
import './PostForm.css'; 

const PostForm = ({ onSubmit, initialData }) => {
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);


  const handleContentChange = (event) => {
    setContent(event.target.value);
  //  onSubmit(formData);
  //  setNewPost('');
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  useEffect(() => {
    // Set the initial content when initialData changes
    if (initialData) {
      setContent(initialData.message || ''); // Adjust property name if needed
      setImage(initialData.image || null);
    }
  }, [initialData]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    formData.append('content', content);
    formData.append('image', image);
  
    try {
      console.log('submitting Form Data', JSON.stringify(formData));
  
      if (initialData) {
        // If updating, you might need to append the ID to the form data
        formData.append('postId', initialData._id);
        await onSubmit(formData, initialData);
      }else {
        await onSubmit(formData);
      }
  
      console.log(formData);
      console.log(content);
      console.log(image);
  
      setContent('');
      setImage(null);
    } catch (error) {
      console.error('Error submitting post:', error.message);
      // Handle the error, e.g., display an error message to the user
    }
  };
  
  

  return (
    <form onSubmit={handleSubmit}>
      <textarea value={content} onChange={handleContentChange} />
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button type="submit">{initialData ? 'Update Post' : 'Create Post'}</button>
    </form>
    // <div className="post-form-container">
    //   <form onSubmit={handlePostSubmit} className="post-form">
    //     <textarea value={newPost} onChange={(e) => setNewPost(e.target.value)} name="content" className="post-textarea"/>
    //     <input type="file" accept="image/*" name="image" className="post-input-file"/>
    //     <button type="submit" className="post-submit-button">Post</button>
    //   </form>
    // </div>
  );
};

export default PostForm;

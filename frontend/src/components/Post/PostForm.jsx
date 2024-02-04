
import React, { useState, useEffect} from 'react';
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
    <form onSubmit={handleSubmit} className="post-form">
      <textarea value={content} placeholder="Create a new post..." className="post-textarea" onChange={handleContentChange} name="content"/>
      <input type="file" className="post-input-file" accept="image/*" onChange={handleImageChange} />
      <button type="submit" className="post-submit-button">{initialData ? 'Update Post' : 'Create Post'}</button>
    </form>
    </div>  
  );
};

export default PostForm;

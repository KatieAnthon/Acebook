import React from 'react';
import Liked from "../LikeButton";
import './Post.css'; // Your existing CSS file

const Post = ({ post, onDelete, showDeleteButton }) => {
  return (
    <article className="post">
      <header className="post-header">
        <p className="post-user">Posted by {post.user.username}</p>
      </header>
      <div className="post-content">
        <p className="post-message">{post.message}</p>
        {post.postImage && (
          <img 
            className="post-image" 
            src={`http://localhost:3000/${post.postImage}`} 
            alt="Post" 
          />
        )}
        <div className="post-actions">
          <Liked />
          {showDeleteButton && (
            <button className="delete-button" onClick={onDelete}>Delete Post</button>
          )}
        </div>
      </div>
    </article>
  );
};
export default Post;

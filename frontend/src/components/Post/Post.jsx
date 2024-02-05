import React from 'react';
import LikeButton from "../LikeButton"
import './Post.css'; // Your existing CSS file
import { Link } from 'react-router-dom';
import UserInfo from '../UserInfo';


const Post = ({ post, onDelete, showDeleteButton }) => {
  return (
    <article className="post">
      <header className="post-header">
        <p className="post-user">
          Posted by{' '}        
            <Link to={`/posts/${post.user?.username}`} >
    {post.user?.username}
          </Link>
            </p>
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
          <LikeButton post_id={post._id} likes={post.likes}/>
          {showDeleteButton && (
            <button className="delete-button" onClick={onDelete}>Delete Post</button>
          )}
        </div>
      </div>
    </article>
  );
};
export default Post;

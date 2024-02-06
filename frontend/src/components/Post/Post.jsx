import './Post.css'; // Your existing CSS file
import { Link } from 'react-router-dom';
import UserInfo from '../UserInfo/UserInfo';
import LikeButton from "../LikeButton/LikeButton";
import './Post.css'; 
import CommentForm from './CommentFormHandle';
import Chat from '../Messages/Message'; 
import React, { useState } from 'react';

const Post = ({ post, onDelete, onEdit, showDeleteButton, onCommentSubmit, focusCommentForm }) => {
  const [isChatVisible, setIsChatVisible] = useState(false);
  const toggleChat = () => {
    setIsChatVisible(!isChatVisible);
  };

  const handleCloseChat = () => {
    setIsChatVisible(false); 
};

  return (
    <article className="post">
      <header className="post-header">
        <p className="post-user">
          Posted by {' '}       
            <Link to={`/posts/${post.username}`} >
    {post.username}
          </Link>
            </p>
      </header>
      <div className="post-content">
        <p className="post-message">{post.message}</p>
        {post.postImage && (
          <div className="post-image-container">
            <img 
              className="post-image" 
              src={`http://localhost:3000/${post.postImage}`} 
              alt="Post" 
            />
          </div>
        )}
       <div className="post-actions">
        <LikeButton post_id={post._id} likes={post.likes} />
        <button onClick={() => focusCommentForm(post._id)} className="my-button">Comment</button>
        {showDeleteButton && (
          <>
            <button className="my-button" onClick={onDelete}>Delete Post</button>
            <button className="my-button" onClick={onEdit}>Edit Post</button>
          </>
        )}
        <button onClick={toggleChat} className="my-button">Message</button> 
      </div>
      {isChatVisible && <Chat postId={post._id}  onClose={handleCloseChat}/>} 
        <div className="post-comments">
          <h3>Comments</h3>
          {post.comments.map((comment, index) => (
            <li key={index} className="comment-item">
              <div className="comment-username">{comment.username}</div>
              <div className="comment-message">{comment.message}</div>
              <div className="comment-date">{comment.date.split("T")[0]}</div>
            </li>
          ))}
         
          <CommentForm postId={post._id} onCommentSubmit={onCommentSubmit} />
        </div>
     
      </div>
    </article>
  );
};

export default Post;

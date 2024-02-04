import LikeButton from "../LikeButton"
import './Post.css'; 
import CommentForm from './CommentFormHandle';
import { getCommentsByPostId } from '../../services/comments'; 

import React, { useState, useEffect } from 'react';

const Post = ({ post, onDelete, showDeleteButton, onCommentSubmit }) => {
  const [comments, setComments] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));

useEffect(() => {
    const fetchComments = async () => {
      if (token) {
        try {
          const commentsData = await getCommentsByPostId(token, post._id);
          setComments(commentsData);
        } catch (err) {
          console.error('Error fetching comments:', err);
        }
      }
    };
    fetchComments();
  }, [token, post._id]);


  const commentsList = comments.toReversed().map((comment, index) => (
    <div key={index} className="comment">
      {comment.message}
    </div>
  ));

  return (
    <article className="post">
      <header className="post-header">
        <p className="post-user">Posted by {post.user?.username}</p>
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
        <div className="post-comments">
        <h3>Comments</h3>
        {commentsList}
        <CommentForm postId={post._id} onCommentSubmit={onCommentSubmit} />
      </div>
      </div>
    </article>
  );
};
export default Post;


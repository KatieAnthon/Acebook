import './Post.css'; // Your existing CSS file
import { Link } from 'react-router-dom';
import LikeButton from "../LikeButton/LikeButton";
import './Post.css';
import '../../App'
import CommentForm from './CommentFormHandle';
import CommentLikeButton from '../LikeButton/CommentLikeButton'
import Chat from '../Messages/Message'; 
import React, { useState } from 'react';

const Post = ({ post, 
                onDelete, 
                onEdit, 
                showDeleteButton, 
                onCommentSubmit, 
                focusCommentForm, 
                onDeleteComment, 
                onUpdateComment,
                currentUserInfo}) => {

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedComment, setSelectedComment] = useState(null); 


  const [isChatVisible, setIsChatVisible] = useState(false);

  const toggleChat = () => {
    setIsChatVisible(!isChatVisible);
  };

  const handleCloseChat = () => {
    setIsChatVisible(false); 
};
const handleCommentEdit = async (comment) => {
  await onCommentSubmit(post._id, comment.message, true); // Pass the flag for edit
  setIsEditModalOpen(true);
  setSelectedComment(comment);
};

// I added this logic, so the message button only shows to another user 
// const showMessageButton = currentUserInfo.userid !== post.user && currentUserInfo.userid !== post.user;



return (
<div className="card">
      <div className="card-body">
        <div className="media">
          <img src={post.userPorfilePicture ? `http://localhost:3000/${post.userPorfilePicture}` : 'default-picture-url'} alt="msg" width="55px" height="55px" className="rounded-circle mr-3"></img>
          <div className="media-body">
            <h5 className="username">{post.username}</h5>
            <p className="card-text text-justify message">{post.message}</p>
            {post.postImage && (
              <div className="post-image-container">
                <img 
                  src={`http://localhost:3000/${post.postImage}`} 
                  alt="Post" 
                  className="img-fluid"
                />
              </div>
            )}
          </div>
          <small className="text-muted">{new Date(post.date).toLocaleTimeString()}</small>
        </div>
      </div>
    </div>
  );
};







export default Post;




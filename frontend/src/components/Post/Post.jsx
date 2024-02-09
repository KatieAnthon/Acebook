import "./Post.css"; // Your existing CSS file
import { Link } from "react-router-dom";
import LikeButton from "../LikeButton/LikeButton";
import "../../App";
import CommentForm from "./CommentFormHandle";
import CommentLikeButton from "../LikeButton/CommentLikeButton";
import Chat from "../Messages/Message";
import React, { useState } from "react";

const MAX_LENGTH = 200;

const Post = ({
  post,
  onDelete,
  onEdit,
  showDeleteButton,
  onCommentSubmit,
  focusCommentForm,
  onDeleteComment,
  onUpdateComment,
  currentUserInfo,
  postUserPicture,
}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [selectedComment, setSelectedComment] = useState(null);
  const [showAllText, setShowAllText] = useState(false);

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
  const handleCommentList = async (comment) => {
    setIsCommentModalOpen(true);
    setSelectedComment(comment);
  };

  const toggleShowAllText = () => {
    setShowAllText(!showAllText);
  };


  const isTextTooLong = post.message.length > MAX_LENGTH;
  const displayText =
    showAllText || !isTextTooLong
      ? post.message
      : `${post.message.substring(0, MAX_LENGTH)}...`;

      return (
        <div className="card">
          <div className="card-body">
            <div className="media">
              <img
                src={
                  post.userPorfilePicture
                    ? `http://localhost:3000/${post.userPorfilePicture}`
                    : "default-picture-url"
                }
                alt="msg"
                width="55px"
                height="55px"
                className="rounded-circle mr-3"
              ></img>
              <div className="media-body">
                <Link to={`/posts/${post.username}`}>{post.username}</Link>
                <div className="card-text text-justify message">
                  {displayText}
                  {isTextTooLong && !showAllText && (
                    <span className="see-more-link" onClick={toggleShowAllText}>
                      See more
                    </span>
                  )}
                </div>
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
              <small className="text-muted">
                {new Date(post.date).toLocaleTimeString()}
              </small>
            </div>
          </div>

          <div className="post-actions">
            <LikeButton post_id={post._id} likes={post.likes} />
            <button
              onClick={() => focusCommentForm(post._id)}
              className="my-button comment-button"
            >
              💬 Comment
            </button>
            {showDeleteButton && (
              <>
                <button className="my-button delete-button" onClick={onDelete}>
                🗑️ Delete 
                </button>
                <button className="my-button comment-button" onClick={onEdit}>
                📝 Edit 
                </button>
              </>
            )}
           {currentUserInfo?.userid !== post?.user && currentUserInfo?.userid !==  post?.user._id && (
                <button onClick={toggleChat} className="my-button comment-button">
                  📥 Message
                </button>
            )}
          </div>
          {isChatVisible && (
            <Chat
              postId={post._id}
              onClose={() => setIsChatVisible(false)}
              setIsChatVisible={setIsChatVisible}
            />
          )}
          <div className="post-comments">
            <h3>Comments</h3>
            {post.comments.map((comment, index) => (
              <div key={index} className="comment-item">
                <div className="comment-header">
                  <div className="comment-username">{comment.username}</div>
                  <div className="comment-date">{comment.date.split("T")[0]}</div>
                </div>
                <div className="comment-message">{comment.message}</div>
                <div className="comment-actions">
                  <CommentLikeButton
                    comment_id={comment._id}
                    likes={comment.likes}
                  />
                  <button
                    className="my-button comment-button"
                    onClick={() => onDeleteComment(comment._id)}
                  >
                    Delete comment
                  </button>
                  <button
                    className="my-button comment-button"
                    onClick={() => handleCommentEdit(comment)}
                  >
                    Edit Comment
                  </button>
                </div>
              </div>
            ))}
          </div>
          <CommentForm postId={post._id} onCommentSubmit={onCommentSubmit} />
          {isEditModalOpen && (
            <div className="edit-post-modal-overlay">
              <div className="edit-post-modal">
                <CommentForm
                  postId={post._id}
                  onCommentSubmit={onCommentSubmit}
                  initialData={selectedComment}
                />
                <button onClick={() => setIsEditModalOpen(false)}>Close</button>
              </div>
            </div>
          )}
          {isCommentModalOpen && (
            <div className="edit-post-modal-overlay">
              <div className="edit-post-modal">
                <button onClick={() => setIsCommentModalOpen(false)}>Close</button>
                <div className="comments-container">
                  {post.comments.map((comment, index) => (
                    <li key={index} className="comment-item">
                      <div className="comment-username">{comment.username}</div>
                      <div className="comment-message">{comment.message}</div>
                      <div className="comment-date">{comment.date.split("T")[0]}</div>
                      <CommentLikeButton
                        comment_id={comment._id}
                        likes={comment.likes}
                      />
                      <button
                        className="my-button"
                        onClick={() => onDeleteComment(comment._id)}
                      >
                        Delete comment
                      </button>
                      <button
                        className="my-button"
                        onClick={() => handleCommentEdit(comment)}
                      >
                        Edit Comment
                      </button>
                    </li>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      );
  }      

export default Post;

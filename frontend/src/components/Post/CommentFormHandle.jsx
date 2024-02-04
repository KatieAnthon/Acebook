import React, { useState } from 'react';
import './CommentFormHandle.css'; 

const CommentForm = ({ postId, onCommentSubmit }) => {
    const [comment, setComment] = useState("");
    
    const handleAddComment = async (event) => {
        event.preventDefault();
        await onCommentSubmit(postId, comment);
        setComment(''); 
    };

    return (
      <div className="comment-form-container">
          <form onSubmit={handleAddComment} className="comment-form">
              <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Write a comment..."
                  className="comment-textarea"
                  name="comment" // You can also use a `name` attribute if you want to work with FormData
              />
              <button type="submit" className="comment-submit-button">Comment</button>
          </form>
      </div>
  );
};

export default CommentForm;
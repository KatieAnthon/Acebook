import React, { useState, forwardRef } from 'react';
import './CommentFormHandle.css'; 

const CommentForm = forwardRef(({ postId, onCommentSubmit }, ref) => {
    const [comment, setComment] = useState("");
    
    const handleAddComment = async (event) => {
        event.preventDefault();
        await onCommentSubmit(postId, comment);
        setComment(''); 
    };

    return (
        <div className="comment-form-container" id={`comment-form-${postId}`}>
          <form onSubmit={handleAddComment} className="comment-form">
              <textarea
                  ref={ref} 
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Write a comment..."
                  className="comment-textarea"
                  name="comment"
              />
              <button type="submit" className="comment-submit-button">Comment</button>
          </form>
      </div>
  );
});


export default CommentForm;
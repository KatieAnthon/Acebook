import React, { useState } from 'react';
import { addCommentToPost } from "../../services/comments"; 

const CommentPost = ({ postId }) => {
    const [comment, setComment] = useState("");

    const handleAddComment = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        formData.append('comment', comment)

        onsubmit(formData)
    };

    return (
        <div className="post-form-container">
      <form onSubmit={handleAddComment} className="post-form">
        <textarea value={comment} onChange={(e) => setComment(e.target.value)} name="content" className="post-textarea"/>
        <input type="file"  className="post-input-file"/>
        <button type="submit" className="post-submit-button">Post</button>
      </form>
    </div>
    );
};

export default CommentPost;
import React, { useState, forwardRef, useEffect } from 'react';
import './CommentFormHandle.css'; 
import './Post.css'

    const CommentForm = forwardRef(({ postId, onCommentSubmit, initialData, profilePic }, ref) => {
        const [comment, setComment] = useState('');
    
        useEffect(() => {
            if (initialData) {
                setComment(initialData.message || '');
            }
        }, [initialData]);
    
        const handleCommentSubmit = async (event) => {
            console.log(profilePic)
            event.preventDefault();
            await onCommentSubmit(postId, comment, initialData ? 'edit' : 'create');
            setComment('');
        };
        
    return (
        <div className="comment-form-container" id={`comment-form-${postId}`}>
            <form onSubmit={handleCommentSubmit} className="comment-form">
                <div className="comment-input-avatar">
                <img 
                src={`http://localhost:3000/${profilePic}`} 
                alt="User Avatar" 
                className="avatar-image" />
                    </div>
                
                <div className="comment-input-container">
                <textarea
                
                    ref={ref}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Write a comment..."
                    className="comment-textarea"
                    name="comment"
                />
                <button type="submit" className="comment-submit-button">
                
                    {initialData ? 'Edit Comment' : 'Send'}
                </button>
                </div>
            </form>
        </div>
    );
});

CommentForm.displayName = 'CommentForm';
export default CommentForm;
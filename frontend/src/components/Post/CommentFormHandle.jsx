import React, { useState, forwardRef, useEffect } from 'react';
import './CommentFormHandle.css'; 

    const CommentForm = forwardRef(({ postId, onCommentSubmit, initialData }, ref) => {
        const [comment, setComment] = useState('');
    
        useEffect(() => {
            if (initialData) {
                setComment(initialData.message || '');
            }
        }, [initialData]);
    
        const handleCommentSubmit = async (event) => {
            event.preventDefault();
            await onCommentSubmit(postId, comment, initialData ? 'edit' : 'create');
            setComment('');
        };
        
    return (
        <div className="comment-form-container" id={`comment-form-${postId}`}>
            <form onSubmit={handleCommentSubmit} className="comment-form">
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
            </form>
        </div>
    );
});

CommentForm.displayName = 'CommentForm';
export default CommentForm;
import LikeButton from "../LikeButton";
import './Post.css'; 
import CommentForm from './CommentFormHandle';

const Post = ({ post, onDelete, showDeleteButton, onCommentSubmit }) => {
  return (
    <article className="post">
      <header className="post-header">
        <p className="post-user">Posted by {post.user?.username}</p>
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
        <div className="post-comments">
          <h3>Comments</h3>
          {post.comments.map((comment, index) => (
            <li key={index} className="comment-item">
              <div className="comment-username">{post.user.username}</div>
              <div className="comment-message">{comment.message}</div>
              <div className="comment-date">{comment.date.split("T")[0]}</div>
            </li>
          ))}
          <CommentForm postId={post._id} onCommentSubmit={onCommentSubmit} />
        </div>
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

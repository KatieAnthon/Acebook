import { addLikeComment } from "../../services/comments";
import { useState, useEffect } from "react";
import { getAllComments } from "../../services/comments";
import '../Post/Post.css'

const CommentLikeButton = ({ comment_id, likes }) => {
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [numberCommentLikes, setCommentNumberLikes] = useState(likes.length);
  const [isLiked, setIsLiked] = useState(false); 

  useEffect(() => {
    const likedPosts = JSON.parse(localStorage.getItem("likedComments")) || [];
    setIsLiked(likedPosts.includes(comment_id));
  }, [comment_id]);

  const handleAddLike = async () => {
    try {
      await addLikeComment(token, { comment_id:comment_id });
      // Update the number of likes by fetching the updated data from the backend
      const updatedCommentsData = await getAllComments(token);
      const updatedComment = updatedCommentsData.comments.find(comment => comment._id === comment_id);
      console.log(updatedComment)
      setCommentNumberLikes(updatedComment.likes.length);
      console.log(numberCommentLikes)
      const likedComments = JSON.parse(localStorage.getItem("likedComments")) || [];
      if (likedComments.includes(comment_id)) {
        const updatedLikedComments = likedComments.filter(id => id !== comment_id);
        localStorage.setItem("likedComments", JSON.stringify(updatedLikedComments));
      } else {
        localStorage.setItem("likedComments", JSON.stringify([...likedComments, comment_id]));
      }
      setIsLiked(prevIsLiked => !prevIsLiked);
    } catch (err) {
      console.error("Error handling like", err.message);
    }
  };

  return (
    <div>
      <button
        className={`my-like-button ${isLiked ? 'liked' : ''}`}
        onClick={handleAddLike}>
        </button>
      <>comment likes {numberCommentLikes}</>
    </div>
  );
};

export default CommentLikeButton;

import { addLikeComment } from "../../services/comments";
import { useState, useEffect } from "react";
import { getAllComments } from "../../services/comments";
import '../Post/Post.css'

const CommentLikeButton = ({ comment_id, likes }) => {
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [numberLikes, setNumberLikes] = useState(likes?.length || 0);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    // Update the number of likes when 'likes' prop changes
    setNumberLikes(likes?.length || 0);
  }, [likes]);

  const handleAddLike = async () => {
    try {
      await addLikeComment(token, { comment_id });
      // Update the number of likes by fetching the updated data from the backend
      const updatedCommentsData = await getAllComments(token);
      const updatedComment = updatedCommentsData.comments.find(comment => comment._id === comment_id);
      setNumberLikes(updatedComment?.likes?.length || 0);
      setIsClicked(true);

    } catch (err) {
      console.error("Error handling like", err.message);
    }
  };

  return (
    <div>
      <button
      className={`my-like-button ${isClicked ? 'clicked' : ''}`}
      onClick={handleAddLike}>
            
        </button>
      <></>
    </div>
  );
};

export default CommentLikeButton;

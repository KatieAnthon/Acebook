import { addUserLike } from "../../services/posts";
import { useState } from "react";
import { getPosts } from "../../services/posts";
import '../Post/Post.css';
import '../../App.css';

const LikeButton = ({ post_id, likes, currentUserInfo }) => {
  const [token] = useState(window.localStorage.getItem("token"));
  const [numberLikes, setNumberLikes] = useState(likes.length);
  const [isClicked, setIsClicked] = useState(likes.includes(currentUserInfo?._id));
  const [isLikeListModalOpen, setIsLikeListModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const handleAddLike = async () => {
    try {
      if (isClicked) {
        // Unlike the post
        await addUserLike(token, { post_id });
        setNumberLikes((prevLikes) => prevLikes - 1);
      } else {
        // Like the post
        await addUserLike(token, { post_id });
        setNumberLikes((prevLikes) => prevLikes + 1);
      }

      // Toggle the like status
      setIsClicked((prevIsClicked) => !prevIsClicked);
    } catch (err) {
      console.error("Error handling like", err.message);
    }
  };

  const handleLikeList = async (post) => {
    setIsLikeListModalOpen(true);
    setSelectedPost(post);
  };

  return (
    <div>
        <button
        className={`my-like-button ${isClicked ? 'clicked' : ''}`}
        onClick={handleAddLike}>
            👍
        </button>

        <button 
        onDoubleClick={() => handleLikeList({ _id: post_id, likes })}> 
        See Who's liked
        </button>
      <>number of likes {numberLikes}</>

      {isLikeListModalOpen && (
        <div className="edit-post-modal-overlay">
          <div className="edit-post-modal">
            <button onClick={() => setIsLikeListModalOpen(false)}>Close</button>
            <h3>Liked by:</h3>
            <ul>
              {selectedPost && selectedPost.likes && selectedPost.likes.map(like => (
                <li key={like.user_id}>
                    
                  <img className="like-profile-pic" src={`http://localhost:3000/${like.profilePic}`} alt={`${like.username}'s profile pic`} />
                    {like.username}
                    {console.log(like.username)}
                    {console.log(like.profilePic)}
                </li>
                
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default LikeButton;

import { addUserLike } from "../../services/posts";
import { useState, useEffect } from "react";
import { getPosts } from "../../services/posts";
import '../Post/Post.css';
import '../../App.css';

const LikeButton = ({ post_id, likes }) => {
  const [token] = useState(window.localStorage.getItem("token"));
  const [numberLikes, setNumberLikes] = useState(likes.length);
  const [isLikeListModalOpen, setIsLikeListModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isLiked, setIsLiked] = useState(false); 

  useEffect(() => {
    const likedPosts = JSON.parse(localStorage.getItem("likedPosts")) || [];
    setIsLiked(likedPosts.includes(post_id));
  }, [post_id]);

  const handleAddLike = async () => {
    try {
        // deal with like in the backend - add or remove from the likes array
        await addUserLike(token, { post_id: post_id });
        // Update the number of likes by fetching the updated data from the backend
        const updatedPostsData = await getPosts(token);
        const updatedPost = updatedPostsData.posts.find(post => post._id === post_id);
        // update the state of NumberLikes and refresh the count
        setNumberLikes(updatedPost.likes.length);
        const likedPosts = JSON.parse(localStorage.getItem("likedPosts")) || [];
        if (likedPosts.includes(post_id)) {
          const updatedLikedPosts = likedPosts.filter(id => id !== post_id);
          localStorage.setItem("likedPosts", JSON.stringify(updatedLikedPosts));
        } else {
          localStorage.setItem("likedPosts", JSON.stringify([...likedPosts, post_id]));
        }
        setIsLiked(prevIsLiked => !prevIsLiked);

    } catch (err) {
        console.error("Error handling like", err.message);
    }
};

const handleLikeList = async (post) => {
  try {
    // Fetch the updated post information before opening the modal
    const updatedPostsData = await getPosts(token);
    const updatedPost = updatedPostsData.posts.find((p) => p._id === post._id);
    
    setIsLikeListModalOpen(true);
    setSelectedPost(updatedPost);
  } catch (err) {
    console.error("Error fetching updated post information", err.message);
  }
};

  return (
    <div className="likeDiv">
        <button
        className={`my-like-button ${isLiked ? 'liked' : ''}`}
        onClick={handleAddLike}>
        </button>

        <button 
        onClick={() => handleLikeList({ _id: post_id, likes })} className="my-button message-button"> 

         👤 liked by {numberLikes}

        </button>

      <> </>

      {isLikeListModalOpen && (
        <div className="edit-post-modal-overlay">
          <div className="edit-post-modal">
            <button onClick={() => setIsLikeListModalOpen(false)}>Close</button>
            <h3>{numberLikes}</h3>
            <ul>
              {selectedPost && selectedPost.likes && selectedPost.likes.map(like => (
                <li key={like.user_id}>          
                  <img className="like-profile-pic" src={`http://localhost:3000/${like.profilePic}`} alt={`${like.username}'s profile pic`} />
                    {like.username}
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

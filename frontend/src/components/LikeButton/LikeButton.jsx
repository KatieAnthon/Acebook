import { addUserLike } from "../../services/posts"
import { useState } from "react";
import { getPosts } from "../../services/posts";

const LikeButton = (likes) => {
    const [token, setToken] = useState(window.localStorage.getItem("token"));
    const [numberLikes, setNumberLikes] = useState(likes.likes.length)

    const handleAddLike = async () => {
        try {
            await addUserLike(token, { post_id: likes.post_id });
            // Update the number of likes by fetching the updated data from the backend
            const updatedPostsData = await getPosts(token);
            const updatedPost = updatedPostsData.posts.find(post => post._id === likes.post_id);
            setNumberLikes(updatedPost.likes.length);
        } catch (err) {
            console.error("Error handling like", err.message);
        }
    };
  
    return (
    <div>
        <button className="my-button" onClick={handleAddLike} > {numberLikes > 1 ? '👍 Likes' : '👍 Like'} {numberLikes == 0 ? "" : `: ${numberLikes}`} 
        </button>
    </div>
    )
}

export default LikeButton;

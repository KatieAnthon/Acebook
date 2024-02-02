import { addUserLike } from "../services/posts"
import { useState } from "react";
import { getPosts } from "../services/posts";

const LikeButton = (likes) => {
    const [token] = useState(window.localStorage.getItem("token"));
    const [numberLikes, setNumberLikes] = useState(likes.likes.length)

    const handleAddLike = async () => {
        try {
            // deal with like in the backend - add or remove from the likes array
            await addUserLike(token, { post_id: likes.post_id });
            // Update the number of likes by fetching the updated data from the backend
            const updatedPostsData = await getPosts(token);
            const updatedPost = updatedPostsData.posts.find(post => post._id === likes.post_id);
            // update the state of NumberLikes and refresh the count
            setNumberLikes(updatedPost.likes.length);
        } catch (err) {
            console.error("Error handling like", err.message);
        }
    };

    return (
    <div>
        <button onClick={handleAddLike} >👍 Likes: {numberLikes}
        </button>
    </div>
    )
}

export default LikeButton;

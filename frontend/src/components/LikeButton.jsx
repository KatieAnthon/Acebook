import { addUserLike } from "../services/posts"
import { useState } from "react";
import { getPosts } from "../services/posts";
import { useEffect } from "react";

const LikeButton = (likes) => {

    const [token, setToken] = useState(window.localStorage.getItem("token"));
    const [numberLikes, setNumberLikes] = useState(likes.likes.length)
    
    useEffect(() => {
        const fetchData = async () => {
            if (token) {
                try {
                    const postsData = await getPosts(token);
                    setNumberLikes(postsData.posts[0].likes.length);
                } catch (err) {
                    console.error('Error fetching posts:', err);
                }
            } else {
                console.log('No token found, navigating to login.');
            }
        };
        fetchData();
    }, [token]);



    // const handleAddLike = async () => {
    //     try {
    //         await addUserLike(token, { post_id: likes.post_id });
    //         // Update the number of likes based on the updated length of likes array
    //         setNumberLikes(likes.likes.length)
    //     } catch (err) {
    //         console.error("Error handling like", err.message);
    //     }
    // };

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
        <button onClick={handleAddLike} >👍 Likes: {numberLikes}
        </button>
    </div>
    )
}

    export default LikeButton;

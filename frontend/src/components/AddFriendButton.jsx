// find user_id from user profile
// find user_id from token

import { sendFriendRequest } from "../services/users"
import { useState } from "react";
import { getPosts } from "../services/posts";

const AddFriendButton = () => {
    const [token] = useState(window.localStorage.getItem("token"));
    const [requestStatus, setRequestStatus] = useState('')

    const handleSendFriendRequest = async () => {
        try {
            
            await sendFriendRequest(token, { post_id: likes.post_id });
            
            const updatedPostsData = await getPosts(token);
            const updatedPost = updatedPostsData.posts.find(post => post._id === likes.post_id);
            // update the state request status
            setRequestStatus('Friend Request Sent');
        } catch (err) {
            console.error("Error handling like", err.message);
        }
    };

    return (
    <div>
        <button onClick={handleSendFriendRequest} >😁 Add Friend {requestStatus}
        </button>
    </div>
    )
}

export default LikeButton;
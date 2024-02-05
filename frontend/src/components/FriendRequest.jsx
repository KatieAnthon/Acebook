import { useState, useEffect } from 'react';
import { getFriendRequestResponse } from "../../services/users";

// fetch friend requests
// return list of friend requests to respond to
// respond to friend requests

const FriendRequest = () => {
    const [token] = useState(window.localStorage.getItem("token"));
    const [friendRequests, setFriendRequests] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            if (token) {
                try {
                const friendRequestData = await getFriendRequestResponse(token);
                setFriendRequests(friendRequestData);
                } catch (err) {
                console.error('Error fetching user information:', err);
                }
            }
        }
        fetchData()
    }, [token]);


    const handleAcceptRequest = async () => {
        try {
            await createPost(token, formData);
            const updatedPosts = await getPosts(token);
            setPosts(updatedPosts.posts);
        } catch (err) {
            console.error('Error creating post:', err.message);
        }
    };

    return (
<></>
    // <div className="feed" role="feed">
    //     {friendRequests.map((friend) => ( 
    //         friend={friend}
    //     ))
    //     <button onClick={handleAcceptRequest}>Add Friend</button>
    //     }
    // </div>
    )
}

export default FriendRequest
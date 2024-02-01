import React, { Component } from "react"
import { addUserLike } from "../services/posts"
import UserProfile from "../pages/User/UserProfile";
import { getUserInfo } from "../services/authentication";
import { useState } from "react";
import { getPosts } from "../services/posts";
import { useEffect } from "react";

const LikeButton = (likes) => {

    const [token, setToken] = useState(window.localStorage.getItem("token"));
    const [posts, setPosts] = useState([]);
    const [numberLikes, setNumberLikes] = useState(likes.likes.length)
    
    useEffect(() => {
        const fetchData = async () => {
            if (token) {
                try {
                const postsData = await getPosts(token);
                setPosts(postsData.posts);
                } catch (err) {
                console.error('Error fetching posts:', err);
                }
            } else {
                console.log('No token found, navigating to login.');
            }
            };
            fetchData()
        }, [token, numberLikes]);

    const handleAddLike = async () => {
        try {
            await addUserLike(token, { post_id: likes.post_id });

        } catch (err) {
            console.error("error handling like", err.message) 
        }
    }

            return (
            <div>
                <button onClick={handleAddLike} >👍 Likes: {numberLikes}
                </button>
            </div>
            )
    
    
}

    export default LikeButton;

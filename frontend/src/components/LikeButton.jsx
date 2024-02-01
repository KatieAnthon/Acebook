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
    const [numberlikes, setLikes] = useState(likes.likes.length)

    // check if post has been liked by user
    // append user_id if they haven't liked it
    
    // fetch number of likes
    // unlike takes user_id out of the array in the db
    
    // Increment liked function needs to be called using this. as a class
    // render required for React.component

    useEffect(() => {
        return (
            <div>
                <button onClick={handleAddLike} >👍 Likes: {numberlikes}
                </button>
            </div>
            )
        }, [token, numberlikes]);



    const handleAddLike = async () => {
        try {
            console.log("post_id",likes.post_id )
            console.log("token", token)
            // const userInfoData = await getUserInfo(token);
            // setUserInfo(userInfoData);
            // console.log(userInfoData)
            await addUserLike(token, { post_id: likes.post_id });
            
            

            // console.log("updatedpost",updatedPosts)
            
        } catch (err) {
            console.error("error handling like", err.message)
        
        }

        export default LikeButton;

    
    // useEffect(() => {
    //     return (
    //         <div>
    //             <button onClick={handleAddLike} >👍 Likes: {numberlikes}
    //             </button>
    //         </div>
    //         );
    //     });




    




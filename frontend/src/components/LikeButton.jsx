import React, { Component } from "react"
import { addUserLike } from "../services/posts"
import UserProfile from "../pages/User/UserProfile";
import { getUserInfo } from "../services/authentication";
import { useState } from "react";

const LikeButton = (likes) => {

    const [token, setToken] = useState(window.localStorage.getItem("token"));

    // check if post has been liked by user
    // append user_id if they haven't liked it
    
    // fetch number of likes
    // unlike takes user_id out of the array in the db
    
    // Increment liked function needs to be called using this. as a class
    // render required for React.component

    const handleAddLike = async () => {
        try {
            console.log("post_id",likes.post_id )
            console.log("token", token)
            // const userInfoData = await getUserInfo(token);
            // setUserInfo(userInfoData);
            // console.log(userInfoData)
            await addUserLike(token, { post_id: likes.post_id });
    
        } catch (err) {
            console.error("error handling like", err.message)
        }
    };
    return (
        <div>
            
            <button onClick={handleAddLike} >👍 Likes: {likes.likes.length}
            </button>
        </div>
        );
    }
    





// class Liked extends Component {

//     // constructor(props) {
//     //     super(props);
//     //     this.state = {
    //         count:0
    //     };
    //     this.token = window.localStorage.getItem("token")
    // }

    
    
    // IncrementLike = (props) => {

    //     console.log(props)
    //     // let newCount = this.state.count + 1
    //     // this.setState({
    //     //     count: newCount
    //     // })
    // }

   // check if post has been liked by user
   // append user_id if they haven't liked it

   // fetch number of likes
   // unlike takes user_id out of the array in the db

// Increment liked function needs to be called using this. as a class
// render required for React.component


// return (
//     <div>
//         <button onClick={this.handleAddLike} > 👍 Likes: {numberOfLikes}
//         </button>
//     </div>
//     );


export default LikeButton;

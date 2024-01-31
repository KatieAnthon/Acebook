import React, { Component } from "react"
import { addUserLike } from "../../../api/controllers/posts";

class Liked extends Component {
    handleAddLike = async () => {
    try {
        const {post_id, user_id} = this.props;

        await addUserLike(token, {post_id, user_id});

    }catch (err) {
        console.error("error handling like", err.message)
    }
};   
    
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

render() {
return (
    <div>
        <button onClick={this.handleAddLike} > 👍 Likes: {this.state.count}
        </button>
    </div>
    );
}
}

export default Liked;

import React, { Component } from "react"

class Liked extends Component {



    const handleAddLike = async () => {
    try {
        await createPost(token, { message: newPostContent });
        
        const updatedPosts = await getPosts(token);
        setPosts(updatedPosts.posts);
    } catch (err) {
        console.error('Error creating post:', err.message);
    }
    };

    state = {
        count: 0
    }



    IncrementLike = (props) => {

        console.log(props)
        // let newCount = this.state.count + 1
        // this.setState({
        //     count: newCount
        // })
    }

   // check if post has been liked by user
   // append user_id if they haven't liked it

   // fetch number of likes
   // unlike takes user_id out of the array in the db

// Increment liked function needs to be called using this. as a class
// render required for React.component

render() {
return (
    <div>
        
        <button onClick={this.IncrementLike} > 👍 Likes: {this.state.count}
        </button>
    </div>
    );
}
}

export default Liked;

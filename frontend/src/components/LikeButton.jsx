import React, { Component } from "react"

class Liked extends Component {
    state = {
        count: 0
    }

   

   IncrementLike = () => {
    let newCount = this.state.count + 1
    this.setState({
        count: newCount
    })
   }

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


import Liked from "../LikeButton"
const Post = (props) => {
  if (!props.post || !props.post.user || !props.post.user.username || !props.post.image) {
    return null; 
  }
  return (
    <article key={props.post._id}>
      <div>
        <p>Post created by {props.post.user.username}: {props.post.message}</p>
        <img src={props.post.image} alt="Post Image" />
        <Liked />
      </div>
      
    </article>
  );
};

export default Post;
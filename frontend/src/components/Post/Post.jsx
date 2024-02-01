import Liked from "../LikeButton"
const Post = (props) => {
  return (
    <article key={props.post._id}>
      <div>
        <p>Post created by {props.post.user.username}: {props.post.message}</p>
        <img src={`http://localhost:3000/${props.post.postImage}`} alt="Profile" />
        <Liked />
      </div>
      
    </article>
  );
};

export default Post;
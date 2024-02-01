
import LikeButton from "../LikeButton"

const Post = (props) => {
  return (
    <article key={props.post._id}>
      <div>
        <p>Post created by {props.post.user.username}: {props.post.message}</p>

        <LikeButton post_id={props.post._id} likes={props.post.likes}/>
        <img src={`http://localhost:3000/${props.post.postImage}`} alt="Profile" />
      </div>
      
    </article>
  );
};

export default Post;
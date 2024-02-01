import Liked from "../LikeButton";

const Post = (props) => {
  return (
    <article key={props.post._id}>
      <div>
        <p>Post created by {props.post.user.username}: {props.post.message}</p>
        {props.post.postImage && (
          <img src={`http://localhost:3000/${props.post.postImage}`} alt="Post" />
        )}
        <Liked />
      </div>
    </article>
  );
};

export default Post;

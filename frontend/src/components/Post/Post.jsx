const Post = (props) => {
  if (!props.post || !props.post.user || !props.post.user.username) {
    return null; 
  }
  return (
    <article key={props.post._id}>
      <div>
        <p>Post created by {props.post.user.username}: {props.post.message}</p>
      </div>
    </article>
  );
};

export default Post;
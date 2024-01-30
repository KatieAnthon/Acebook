const Post = (props) => {
  return (
    <article key={props.post.id}>
      <div>
        <p>Post created by {props.post.username}: {props.post.message}</p>
      </div>
    </article>
  );
};

export default Post;

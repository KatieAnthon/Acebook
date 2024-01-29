const Post = (props) => {
  return <article 
    key={props.post.id}>
    {props.post.username}
    
    <div>
    {props.post.message}
    
    </div></article>;
};

export default Post;

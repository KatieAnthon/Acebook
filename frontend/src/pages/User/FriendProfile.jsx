import { useState, useEffect,  } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import { getFriendPost } from "../../services/posts"
import Post from "../../components/Post/Post";
import NavBar from "../../components/NavBar/NavBar"
import { getFriendInfo } from "../../services/authentication"
import "../../components/Post/Post.css"
import AddFriendButton from "../../components/AddFriendButton";
import './FriendProfile.css';
// styling
import AboutMe from "../../components/UserInfo/AboutMe";
import { Container, Card, Image } from "react-bootstrap";
import banner from './banner.jpg';
import Stack from 'react-bootstrap/Stack';
import { MyMessages } from "../../pages/Message/MessagePage"

export const FriendProfile = () => {
const [posts, setPosts] = useState([]);
const [token] = useState(window.localStorage.getItem("token"));
const [FriendInfo, setFriendInfo] = useState([]);
const { username } = useParams();
const [comments, setComments] = useState([]);

const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (token && username) {
        try {       
          const FriendInfoData = await getFriendInfo(token, username);  
          setFriendInfo(FriendInfoData);

          const PostsData = FriendInfoData.posts
          setPosts(PostsData)

        } catch (err) {
          console.error('Error fetching user information:', err);
        }
      }
    };
  
    fetchData();
  }, [token, username]);

  const handleCommentSubmit = async (postId, commentText) => {
    try {
      const commentResponse = await addCommentToPost(token, postId, commentText);
      const newComment = commentResponse.comment; 
  
      setPosts(currentPosts => currentPosts.map(post => {
        if (post._id === postId) {
          const comments = Array.isArray(post.comments) ? post.comments : [];
          return { ...post, comments: [...comments, newComment] };
        }
        return post;
      }));
    } catch (err) {
      console.error('Error adding comment:', err.message);
    }
  };

  const openMessagesModal = (event) => {
    event.preventDefault(); 
    setIsModalOpen(true);   
  };

  //{/* // style={{height: 500, width: '100%'}} src="../profile_cover_photo/friend_banner.jpg"  */}

  return (
  <div className="main-wrapper">
    <NavBar />
        <Container fluid>
          <Stack gap={3}>
                {FriendInfo && (
                  <div style={{ 
                    backgroundImage: `url(${banner})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '500px'// or whatever height you want
                  }}>
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
                      <div style={{ textAlign: "center", color: "white" }}>
                        <Image variant="top" style={{width: 100, height: 100, objectFit: 'cover', borderRadius: '50%'}} src={FriendInfo.profilePic ? `http://localhost:3000/${FriendInfo.profilePic}` : 'default-picture-url'} />
                        <div>{FriendInfo.username || 'Default Username'}</div>
                      </div>
                    </div>
                  </div>
                )}
            </Stack>
        </Container>
          <Container fluid>
          <div className="row">
            <div className="col-lg-6">
            <div className="left-column">
          <div className="container-about-me">
                      <AboutMe />
                    </div>
                  </div>
                  </div>
                 
                    
                    
            <div className="col-lg-6">
            <div className="right-column">
          <div className="container-posts">
        {posts.map((post) => (
          <Post 
          key={post._id} 
          post={post}
          onCommentSubmit={handleCommentSubmit}
          focusCommentForm={() => focusCommentForm(post._id)} 
          />
        ))}
        </div>
        </div>
        </div>
        </div>
        </Container>
        </div>
        
    
);
};

export default FriendProfile;
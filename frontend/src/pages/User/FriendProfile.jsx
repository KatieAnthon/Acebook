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

export const FriendProfile = () => {
const [posts, setPosts] = useState([]);
const [token] = useState(window.localStorage.getItem("token"));
const [FriendInfo, setFriendInfo] = useState([]);
const { username } = useParams();

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

  //{/* // style={{height: 500, width: '100%'}} src="../profile_cover_photo/friend_banner.jpg"  */}

  return (
  <div className="main-wrapper">
    <div container-card>
        <NavBar />
          <Card>   
            <Card.Img 
              style={{ 
              backgroundImage: `url(${banner})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              height: '500px'
            }}/>
              <Card.ImgOverlay>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%'  }}>
              <div style={{ textAlign: "center", textDecorationColor: "color" }}>
                  <Image variant="top" 
                  style={{width: 100, height: 100, objectFit: 'cover', borderRadius: '50%'}}  
                  src={FriendInfo.profilePic ? `http://localhost:3000/${FriendInfo.profilePic}` : 'default-picture-url'} />
                  <Card.Body>
                    <Card.Title style={{color: "white"}}>{username}</Card.Title>
                    <Card.Text style={{color: "white"}}></Card.Text>
                    <AddFriendButton user_id={FriendInfo.user_id} />
                  </Card.Body>
                  </div>
                  </div>
              </Card.ImgOverlay>
          </Card>
          </div>
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
          <Post key={post._id} post={post} />
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
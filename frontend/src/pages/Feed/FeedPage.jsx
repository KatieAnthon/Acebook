import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { getPosts} from "../../services/posts";
import { addCommentToPost } from "../../services/comments";
import { updateComment} from '../../services/comments';
import { getUserInfo } from "../../services/authentication";
import { createPost } from '../../services/posts'; 
import { deleteComment } from "../../services/comments";
import Post from "../../components/Post/Post";
import PostForm from "../../components/Post/PostForm";
import NavBar from "../../components/NavBar/NavBar"
import UserInfo from "../../components/Userinfo/UserInfo"
import Introduction from "../../components/Introduction/Introduction"
import '../../components/Post/Post.css'
import "./FeedPage.css"
import { Card, Col, Row } from 'react-bootstrap';
import FriendToggle from '../../components/FriendToggle';
// import FriendToggle from "../../components/FriendToggle"
import { MyMessages } from "../../pages/Message/MessagePage"
import AboutMe from '../../components/UserInfo/AboutMe';

export const FeedPage = () => {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [friends, setfriends] = useState([])
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        try {
          const userInfoData = await getUserInfo(token);
          
  
          setUserInfo(userInfoData);


          setfriends(userInfoData.friends)
          
          
        } catch (err) {
          console.error('Error fetching user information:', err);
        }
        try {
          const fetchedPosts = await getPosts(token);
          const postWithComments = fetchedPosts.posts.map(post => ({
            ...post,
          }))
          setPosts(postWithComments);
        } catch (err) {
          console.error('Error fetching posts:', err);
        }
      } else {
        console.log('No token found, navigating to login.');
        navigate("/login");
      }
    };
    fetchData();
  }, [token, navigate]);

const handlePostSubmit = async (formData) => {
    try {
      await createPost(token, formData);
      const updatedPosts = await getPosts(token);
      setPosts(updatedPosts.posts);
    } catch (err) {
      console.error('Error creating post:', err.message);
    }
  };

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
  
  const handleDeleteComment = async (commentId) => {
    console.log('Deleting comment with ID:', commentId);
  
    try {
      await deleteComment(token, commentId);
      console.log('Comment deleted successfully');
  
      // Update the comments state
      const updatedComments = comments.filter(comment => comment._id !== commentId);
      setComments(updatedComments);
  
      // Update the posts state to remove the deleted comment
      setPosts(currentPosts =>
        currentPosts.map(post => {
          if (post.comments.some(comment => comment._id === commentId)) {
            // If the post contains the deleted comment, remove it
            const updatedPostComments = post.comments.filter(comment => comment._id !== commentId);
            return { ...post, comments: updatedPostComments };
          }
          return post;
        })
      );
    } catch (err) {
      console.error('Error deleting comment:', err.message);
    }
  };
  const focusCommentForm = (postId) => {
    const form = document.getElementById(`comment-form-${postId}`); 
    form.scrollIntoView({ behavior: 'smooth' });
    form.querySelector('textarea').focus();
  }

  
  const openMessagesModal = (event) => {
    event.preventDefault(); 
    setIsModalOpen(true);   
  };

  
  return (
    <>

      <div className="main-wrapper">
        <div className="page-wrapper">
          <NavBar onMessagesClick={openMessagesModal} />
          {isModalOpen && <MyMessages isModalOpen={isModalOpen} closeModal={() => setIsModalOpen(false)} />}
        </div>   
        <Introduction pageName={"Feed"}/>
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="left-column">
                <div className="card-container">
                  <Card className="mt-4 sticky-card">   
                    <div className="user-container">
                      {userInfo && (
                        <UserInfo
                          userPicture={userInfo.profilePic ? `http://localhost:3000/${userInfo.profilePic}` : 'default-picture-url'}
                          userName={userInfo.username || 'Default Username'}
                          userEmail={userInfo.email || 'Default Email'} 
                        />
                      )}
                    </div>
                  </Card>
                  <div style={{ marginTop: '60px' }}> {/* Adjust margin-top as needed */}
                    <div className="container-about-me">
                      <AboutMe />
                    </div>
                  </div>
                  <div className="friend-list">
                    <h2>🫂</h2>
                    <div className="friend-table">
                      <div className="container-friends">
                        {friends.map((friend) => ( 
                          <FriendToggle 
                            key={friend._id}
                            friend={friend.username}
                            picture={`http://localhost:3000/${friend.friendProfilePic}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-6">
              <div className="right-column">
      <PostForm onSubmit={handlePostSubmit} />
              <div className="feed" role="feed">
                {posts.slice().reverse().map((post) => (
                  <Post
                    key={post._id} 
                    post={post} 
                    // onDelete={() => handleDelete(post._id)} 
                    showDeleteButton={false} 
                    onCommentSubmit={handleCommentSubmit}
                    focusCommentForm={() => focusCommentForm(post._id)}
                    onDeleteComment={(commentId) => handleDeleteComment(commentId)}
                    currentUserInfo={userInfo}
                  />
                ))}
              </div>
            </div>
  </div>
          </div>
        </div>
      </div>
    </>
  );  
};

export default FeedPage;
import React, { useState, useEffect, useRef, useContext } from "react";

import "./index.scss";
import { LoadingButton } from "@mui/lab";

import { useLocation, Link } from "react-router-dom";
import "./index.scss";
// import img from "../../assets/item.jpg";
import commentApi from "../../api/comment";
import { CardMedia, Avatar } from "@material-ui/core";
import { getTimeDistanceFromNow } from "../../utils/formater";
import { Button } from "@mui/material";
import axios from "axios";
import { Input, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { io } from "socket.io-client";
import { AuthContext } from "../../context/AuthContext";
import CommentItem from "../../components/CommentItem";

function HomePostDetail(props) {
  //truyen props thong qua Link
  const location = useLocation();
  const { post } = location.state;
  const [user, setUser] = useState({});
  const [comment, setComment] = useState([]);
  const socket = useRef();
  const { user: profile } = useContext(AuthContext);

  const [postData, setPostData] = useState({
    content: "",
  });

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on(`getComment-${post._id}`, (_comment) => {
      console.log(_comment, "on comment");
      setComment((prev) => [...prev, _comment]);
    });
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?userId=${post.authorId}`);
      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);

  const onChange = (e) => {
    const { value, name } = e.target;
    setPostData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    commentApi.getComment(post._id).then((res) => {
      setComment(res.data);
    });
  }, []);

  const onComment = async () => {
    commentApi.postComment({
      authorId: profile?._id,
      content: postData.content,
      postId: post._id,
    });

    socket.current.emit(`sendComment`, {
      authorId: profile?._id,
      content: postData.content,
      postId: post._id,
      authorInfo: profile,
    });
    setPostData({
      content: "",
    });
  };

  return (
    <div className='PD'>
      <section className='PD-right_head'>
        <Link to='/' style={{ textDecoration: "none" }}>
          <Button size='small' variant='outlined'>
            <i style={{ marginRight: "10px" }} class='fas fa-arrow-left'></i>
            Home Page
          </Button>
        </Link>{" "}
      </section>{" "}
      <hr />
      <br />
      <div className='PD-left'>
        <CardMedia
          image={post.img}
          title='Title'
          style={{ height: "500px", width: "720px", borderRadius: "5px" }}
        />

        <hr />
        <section className='PD-left-comment'>
          <div className='PD-left-comment-top'>
            <textarea
              className='PD-left-comment-top-input'
              name='content'
              type='text'
              placeholder='Write a comment'
              onChange={onChange}
              value={postData.content}
            />
            <LoadingButton
              className='PD-left-comment-top-button'
              color='primary'
              onClick={onComment}
            >
              Send
            </LoadingButton>
          </div>
          <br /> <br />
          <div className='PD-left-comment-content '>
            {comment?.reverse().map((item) => {
              return (
                <div className='commentPost-User'>
                  <CommentItem item={item} />
                </div>
              );
            })}
          </div>
          <hr />
        </section>
        <br />
        <br />
        <br />
      </div>
      <div className='PD-right'>
        <section className='PD-right-infor'>
          <Avatar className='postProfileImg' src={user.profilePicture} alt='' />
          <div className='PD-right-infor-username'>{user.username}</div>
          <span style={{ width: "30%" }}>{getTimeDistanceFromNow(post.createdAt)}</span>
          <div className='PD-right-infor-button'>
            <Button size='small' variant='outlined'>
              Theo dõi
            </Button>
            <br />
          </div>
        </section>
        <section className='PD-right-content'>
          <p>{post.content}</p>
        </section>
      </div>
    </div>
  );
}

export default HomePostDetail;

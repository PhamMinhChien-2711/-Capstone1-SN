import React, { useState, useEffect, useRef, useContext } from "react";
import { useLocation, Link } from "react-router-dom";
import "./index.scss";
import { getTimeDistanceFromNow } from "../../utils/formater";
import { Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { AuthContext } from "../../context/AuthContext";
import commentApi from "../../api/commentHoiDap";
import CommentItem from "../../components/CommentItem";
import { io } from "socket.io-client";
import ButtonBack from "../../components/ButtonBack";
function HoiDapPostDetail(props) {
  //truyen props thong qua Link
  const { user: profile } = useContext(AuthContext);
  const location = useLocation();
  const { post } = location.state;
  const [comment, setComment] = useState([]);
  const [postData, setPostData] = useState({
    content: "",
  });
  const socket = useRef();
  const onChange = (e) => {
    const { value, name } = e.target;
    setPostData((prev) => ({ ...prev, [name]: value }));
  };
  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on(`getComment-${post._id}`, (_comment) => {
      console.log(_comment, "on comment");
      setComment((prev) => [...prev, _comment]);
    });

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
    <div className='HDPD'>
      <div className='HDPD-left'>
        <section className='HDPD-left__head'>
          <Link to='/hoidap' style={{ textDecoration: "none" }}>
            <ButtonBack title='Back' />
          </Link>
        </section>

        <section className='HDPD-left__img'>
          <img src={post.img} />
          {/* <img src='https://images.unsplash.com/photo-1635365349638-c79256d73f79?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80' /> */}
        </section>

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

          <div className='PD-left-comment-content '>
            {comment?.reverse().map((item) => {
              return (
                <div className='commentPost-User'>
                  <CommentItem item={item} />
                </div>
              );
            })}
          </div>
        </section>
      </div>
      <div className='HDPD-right'>
        <div className='HDPD-right__infor'>
          <lable className='HDPD-right__infor-author'>{post?.authorInfo?.username}</lable>
          <Button className='HDPD-right__infor-button' size='small' variant='outlined'>
            Theo dõi
          </Button>
        </div>

        <div className='HDPD-right__date'>
          {" "}
          Đã đăng khoảng {getTimeDistanceFromNow(post.createdAt)}{" "}
        </div>

        <div className='HDPD-right__content'>
          <img width='20' height='20' src='/assets/downright.svg' />
          {/* <span className='HDPD-right__content-title'>{post.title}</span> */}
          <p className='HDPD-right__content-contentPost'>{post.content}</p>
        </div>
      </div>
    </div>
  );
}
export default HoiDapPostDetail;

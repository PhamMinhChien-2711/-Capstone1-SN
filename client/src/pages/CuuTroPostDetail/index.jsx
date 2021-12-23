import React, { useState, useEffect,useRef,useContext } from "react";
import { useLocation, Link } from "react-router-dom";
import "./index.scss";
import { LoadingButton } from "@mui/lab";
import CommentItem from "../../components/CommentItem";
import axios from "axios";
import { getTimeDistanceFromNow } from "../../utils/formater";
import { AuthContext } from "../../context/AuthContext";
import Map from "../../components/Map/Map";
import ViewFullImage from "../../components/ViewFullImage/ViewFullImage";
import { io } from "socket.io-client";
import { Button } from "@mui/material";
import commentApi from "../../api/commentCuuTro";
import ButtonBack from "../../components/ButtonBack";
function CuuTroPostDetail(props) {
  const key = "AIzaSyCgRBeGCNcwSBnC4ppydD7HTZzgJU1hIYI";
  //truyen props thong qua Link
  const { user: profile } = useContext(AuthContext);
  const location = useLocation();
  const [comment, setComment] = useState([]);
  const [post, setPost] = useState({
    title: "",
    content: "",
    postImage: "",
    visible: false,
  });
  const [postData, setPostData] = useState({
    content: "",
  });
  const [status, setStatus] = useState(true);
  // const [buttonStatus, setButtonStatus] = useState(true)
  // const { post } = location.state;
  const loadPost = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_API}/support/listDetail/${
          location.pathname.split("/")[2]
        }`
      );
      console.log(response);
      if (response.data.success) {
        setPost(response.data.findPost);
      }
      console.log("location: ", location);
    } catch (error) {}
  };
  const socket = useRef();
  const onChange = (e) => {
    const { value, name } = e.target;
    setPostData((prev) => ({ ...prev, [name]: value }));
  };
  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on(`getComment-${location.pathname.split("/")[2]}`, (_comment) => {
      console.log(_comment, "on comment");
      setComment((prev) => [...prev, _comment]);
    });

    commentApi.getComment(location.pathname.split("/")[2]).then((res) => {
      setComment(res.data);
    });
  }, []);
  const onComment = async () => {
    commentApi.postComment({
      authorId: profile?._id,
      content: postData.content,
      postId:   post._id,
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
  useEffect(() => {
    loadPost();
  }, []);
  const editPost = () => {
    return (
      <div>
        <section className='body'>
          <input
            onChange={handleSubmit}
            name='title'
            className='body-title'
            defaultValue={post.title}
            style={{
              border: "1px solid rgb(184, 184, 184)",
              borderRadius: "5px",
              paddingLeft: "5px",
              width: "98%",
              height: "35px",
              marginBottom: "7px",
            }}
          ></input>
          <br />
          <input
            onChange={handleSubmit}
            name='content'
            className='body-content'
            defaultValue={post.content}
            style={{
              border: "1px solid rgb(184, 184, 184)",
              borderRadius: "5px",
              paddingLeft: "5px",
              width: "98%",
              height: "35px",
              marginBottom: "7px",
            }}
          ></input>
        </section>
        <section className='img'>
          <img src={post.postImage} />
        </section>
        <section
          className='change-img'
          style={{ marginTop: "10px", marginBottom: "10px" }}
        >
          <input type='file'></input>
        </section>
        <div className='EditPost-button' style={{ width: "98%" }}>
          <form onClick={callAPI}>
            <Button size='medium' variant='contained' onClick={changeStatus}>
              Lưu bài viết
            </Button>
          </form>
        </div>
      </div>
    );
  };
  const contentPost = () => {
    return (
      <div>
        <section className='body'>
          {/* <h3 className='body-title'>
                        {post._id}
                    </h3> */}
          <h3 className='body-title' name='title'>
            {post.title}
          </h3>
          <p className='body-content' name='content'>
            {post.content}
          </p>
        </section>
        <section className='img'>
          <img src={post.postImage} onClick={() => setPost({ ...post, visible: true })} />
        </section>
      </div>
    );
  };
  const checkStatus = () => {
    if (status === true) {
      return contentPost();
    } else {
      return editPost();
    }
  };
  const changeStatus = () => {
    setStatus(!status);
  };

  const callAPI = async (e) => {
    e.preventDefault();
    const res = await axios.put(
      `${process.env.REACT_APP_BASE_API}/support/${location.pathname.split("/")[2]}`,
      {
        title: post.title,
        content: post.content,
        postImage: post.postImage,
      }
    );
    if (res?.data?.success) {
      setPost(res?.data?.updatePost);
    }
    // setPost(res?.data?.updatePost)
    console.log("res: ", res);
  };

  const handleSubmit = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };
  return (
    <div className='CTPDT'>
      {/* <div className='Button-onclick'>
        <div className='EditPost-button'>
          <form>
            <Button size='medium' variant='contained' onClick={changeStatus}>
              Sửa bài viết
            </Button>
          </form>
        </div>
      </div> */}
      <div className='CTPDT-head'>
        <Link to='/cuutro' style={{ textDecoration: "none" }}>
          <ButtonBack title='Back' />
        </Link>{" "}
      </div>
      <div className='CTPDT-body'>
        <div div className='CTPDT-body-left'>
          {/* {contentPost()} */}
          {checkStatus()}
          <hr/>
          <section className='CTPDT-body-left-comment'>
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
        <div className='CTPDT-body-right-infor'>
          <span className='CTPDT-body-right-infor-author'>{post.name}</span>
          <Button
            className='CTPDT-body-right-infor-button'
            size='small'
            variant='outlined'
          >
            Theo dõi
          </Button>
          <br />
          <span className='CTPDT-body-right-infor-date'>Ngày đăng: {getTimeDistanceFromNow(post.createdAt)}</span>

          {/* <div style={{ marginTop: "4%", width: "150%" }}>
            <Map
              lat={post.lat}
              lng={post.lng}
              label={post.label}
              googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${key}&callback=initMap`}
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={
                <div
                  style={{ height: `90vh`, margin: `auto`, border: "2px solid black" }}
                />
              }
              mapElement={<div style={{ height: `100%` }} />}
            />
          </div> */}
        </div>
        {post.visible ? (
          <ViewFullImage
            url={post.postImage}
            onClick={() => setPost({ ...post, visible: false })}
          />
        ) : null}
      </div>
    </div>
  );
}

export default CuuTroPostDetail;

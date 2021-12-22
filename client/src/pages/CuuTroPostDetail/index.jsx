import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import "./index.scss";
import axios from "axios";
import Map from "../../components/Map/Map";
import ViewFullImage from "../../components/ViewFullImage/ViewFullImage";

import { Button } from "@mui/material";
import ButtonBack from "../../components/ButtonBack";
function CuuTroPostDetail(props) {
  const key = "AIzaSyCgRBeGCNcwSBnC4ppydD7HTZzgJU1hIYI";
  //truyen props thong qua Link
  const location = useLocation();
  const [post, setPost] = useState({
    title: "",
    content: "",
    postImage: "",
    visible: false,
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

          <section className='CTPDT-body-left-comment'>comment</section>
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
          <span className='CTPDT-body-right-infor-date'>Ngày đăng: {post.createdAt}</span>

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

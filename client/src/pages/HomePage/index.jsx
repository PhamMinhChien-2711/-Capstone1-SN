import React, { useState, useContext, useEffect, useRef } from "react";

import { Button } from "@material-ui/core";
import { AuthContext } from "../../context/AuthContext";
import { LoadingButton } from "@mui/lab";
import CreateIcon from "@mui/icons-material/Create";
import "./index.scss";
import LoadingBar from "react-top-loading-bar";
import LoadingOverlay from "react-loading-overlay";
import { createPost, fetchPosts, likePost } from "../../api/post";
import { uploadImage } from "../../api/upload";
import styled, { css } from "styled-components";
import axios from 'axios'
import {
  Container,
  Row,
  Col,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import Post from "../../components/PostList/Post";
import { seo } from "../../utils/seo";
const active = {
  borderBottom: "3px solid black",
};

const Home = (props) => {
  const tabs = ["Mới nhất", "Quan tâm", "Xu hướng"];
  const [currentFilter, setCurrentFilter] = useState("Mới nhất");

  const [postData, setPostData] = useState({
    title: "",
    content: "",
    attachment: "",
  });

  const { user, dispatch } = useContext(AuthContext);
  const [url, setUrl] = useState("");

  const [modal, setModal] = useState(false);
  const [postLoading, setPostLoading] = useState(false);

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    seo("");
    loadingRef.current.continuousStart();
    setPostLoading(true);
    fetchPosts().then((res) => {
      setPosts(res.data);
      loadingRef.current.complete();
      setPostLoading(false);
    });
  }, []);

  const toggle = () => setModal(!modal);

  const onChange = (e) => {
    const { value, name } = e.target;
    setPostData((prev) => ({ ...prev, [name]: value }));
  };

  const post = async () => {
    setPostLoading(true);
    createPost({
      title: postData.title,
      content: postData.content,
      img: url,
      authorId: user?._id,
    })
      .then((res) => {
        console.log(res, "post res");
        setPostLoading(false);
        toggle();
        fetchPosts().then((res) => {
          setPosts(res.data);
        });
      })
      .catch((err) => {
        console.log(err, "err");
        setPostLoading(false);
      });
  };

  const upload = async (e) => {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    const res = await uploadImage(formData);
    setUrl(res.data.url);
    console.log("res.url", res);
  };

  const onLike = (postId) => {
    // Gọi api like để update dữ liệu dưới db
    likePost(postId, user?._id);

    // Thay đổi state để render ra giao diện
    const newPosts = posts.map((post) => {
      if (post._id == postId) {
        if (post.likeCount.includes(user?._id)) {
          // dislike
          return {
            ...post,
            likeCount: post.likeCount.filter((userId) => userId != user?._id),
          };
        }
        // liken
        return {
          ...post,
          likeCount: [...post.likeCount, user?._id],
        };
      }
      return post;
    });

    setPosts(newPosts);
  };

  const deletePost = async (_id) => {
    const response = await axios.delete(`${process.env.REACT_APP_BASE_API}/posts/deleted/${_id}`, { _id })
    

    console.log('response', response)

  }

  const loadingRef = useRef(null);


  return (
    <div className='Home'>
      <LoadingBar color='black' ref={loadingRef} shadow={true} />

      <div className='Home-button'>
        <div className='Home-button-1'>
          {tabs.map((tab, index) => {
            return (
              <Button
                key={tab}
                onClick={() => setCurrentFilter(tab)}
                style={currentFilter === tab ? active : {}}
              >
                {tab}
              </Button>
            );
          })}
        </div>
        <div className='Home-button-2'>
          <Button onClick={toggle} color='primary' variant='contained'>
            Viết bài <CreateIcon />
          </Button>
          {/*Modal: Hiện pop-up để đăng bài */}

          <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Add a post ✍️</ModalHeader>
            <ModalBody>
              {/* <Input
                style={{ marginBottom: "0.5rem" }}
                name='title'
                type='text'
                placeholder='title'
                onChange={onChange}
                value={postData.title}
              /> */}
              <Input
                style={{ marginBottom: "0.5rem" }}
                name='content'
                type='textarea'
                placeholder='Bạn đang nghĩ gì thế...?'
                
                onChange={onChange}
                value={postData.content}
              />
              {url && (
                <img
                  src={url}
                  alt=''
                  style={{ width: "100%", height: "100%", marginBottom: "15px" }}
                />
              )}

              <input type='file' id='file' accept='.png,.jpeg,.jpg' onChange={upload} />
            </ModalBody>
            <ModalFooter>
              <LoadingButton loading={postLoading} color='primary' onClick={post}>
                Đăng Ngay
              </LoadingButton>
              <Button variant='danger' onClick={toggle}>
                Huỷ
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      </div>

      <hr />

      <div className='Home-posts'>
        {/* <PostList posts={posts}/> */}
        <DarkBackground disappear={postLoading}>
          <LoadingOverlay
            active={true}
            // spinner={<BounceLoader />}
            spinner={true}
            text='Loading'
          >
            {/* <p>Some content or children or something.</p> */}
          </LoadingOverlay>
        </DarkBackground>
        <Row>
          {posts.map((post) => (
            <Col key={post._id}>
              <Post post={post} onLike={onLike} />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

const DarkBackground = styled.div`
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 500; /* Sit on top */
  left: 0;
  top: 0%;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */

  ${(props) =>
    props.disappear &&
    css`
      display: block; /* show */
    `}
`;

export default Home;

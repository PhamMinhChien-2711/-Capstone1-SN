import React, { useState, useContext, useEffect, useRef } from "react";
import { Button } from "@mui/material";
import "./index.scss";
import { AuthContext } from "../../context/AuthContext";
import { HoiDapPosts } from "../../rawData/HoiDapPosts";
import HoiDapItem from "../../components/Item/HoiDapItem";
import Loader from "react-loader-spinner";
import {
  Container,
  Row,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { LoadingButton } from "@mui/lab";
import { createPost, fetchPosts } from "../../api/postHoiDap";
import { uploadImage } from "../../api/upload";
import LoadingBar from "react-top-loading-bar";
import { seo } from "../../utils/seo";
import LoadingVipPro from "../../components/LoadingVipPro";

const HoiDap = (props) => {
  const { user, dispatch } = useContext(AuthContext);
  const [url, setUrl] = useState("");
  const [postData, setPostData] = useState({
    title: "",
    content: "",
    attachment: "",
  });
  useEffect(() => {
    seo("Hỏi Đáp");
    loadingRef.current.continuousStart();
    setLoading(true);
    fetchPosts().then((res) => {
      setPosts(res.data);
      loadingRef.current.complete();
      setLoading(false);
    });
  }, []);
  const [posts, setPosts] = useState([]);
  const [modal, setModal] = useState(false);
  // const [postLoading, setPostLoading] = useState(false);
  const onChange = (e) => {
    const { value, name } = e.target;
    setPostData((prev) => ({ ...prev, [name]: value }));
  };
  const toggle = () => setModal(!modal);
  const post = async () => {
    createPost({
      title: postData.title,
      content: postData.content,
      img: url,
      authorId: user._id,
    }).then((res) => {
      console.log(res, "post res");

      toggle();
      fetchPosts().then((res) => {
        setPosts(res.data);
      });
    });
  };
  const upload = async (e) => {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    const res = await uploadImage(formData);
    setUrl(res.data.url);
    console.log("res.url", res);
  };
  const loadingRef = useRef(null);
  const [loading, setLoading] = useState(false);
  return (
    <div className='HoiDap'>
      <LoadingBar color='black' ref={loadingRef} shadow={true} />
      {loading && <LoadingVipPro />}
      <div className='HoiDap-button'>
        <Button onClick={toggle} color='error' size='medium' variant='contained'>
          Đặt câu hỏi <img heigh='15' width='20' src='/assets/question.svg' />
        </Button>
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Add a post ✍️</ModalHeader>
          <ModalBody>
            <Input
              style={{ marginBottom: "0.5rem" }}
              name='content'
              type='textarea'
              placeholder='Bạn muốn hỏi gì....'
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
            <LoadingButton color='primary' onClick={post}>
              POST IT
            </LoadingButton>
            <Button variant='danger' onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>

      <div className='HoiDap-body'>
        <div className='left'>
          <>
            {posts.map((post) => {
              return <HoiDapItem post={post} />;
            })}
          </>
        </div>
        <div className='right'>
          <h5>Đáng quan tâm</h5>
          <hr />
          <h6>Tôi không thể sống nếu thiếu nó</h6>
          <span>created by Nhat Long </span>
          <hr />
          <h6>Làm ơn hãy giúp tôi</h6>
          <span>created by Elon </span>
        </div>
      </div>
    </div>
  );
};

export default HoiDap;

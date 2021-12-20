import React, { useState, useEffect, useRef, useContext } from "react";

import './index.scss';
import { LoadingButton } from '@mui/lab';
import { fetchPosts,updatePost  } from "../../api/post";
import { useLocation, Link } from "react-router-dom";
import "./index.scss";
// import img from "../../assets/item.jpg";
import commentApi from "../../api/comment";
import { CardMedia, Avatar } from "@material-ui/core";
import { getTimeDistanceFromNow } from "../../utils/formater";
import { Button } from "@mui/material";
import axios from "axios";
import {  Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { io } from "socket.io-client"
import { AuthContext } from "../../context/AuthContext";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CancelIcon from '@mui/icons-material/Cancel';
import MoreVert from "@material-ui/icons/MoreVert";
import { uploadImage } from "../../api/upload";
import CommentItem from "../../components/CommentItem";

function HomePostDetail(props) {
    //truyen props thong qua Link
    const location = useLocation();
    const { post } = location.state;
    console.log(location.state,"location.state");
    const [user, setUser] = useState({});
    const [comment, setComment] = useState([]);
    const socket = useRef();
    
    const { user:profile } = useContext(AuthContext);
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const [postModal, setpostModal] = useState(false);
    const togglePost = () => setpostModal(!postModal);
    const [postData, setPostData] = useState({
        content: ""
    });
    const [url, setUrl] = useState("");

    const [posts, setPosts] = useState([])

    useEffect(() => {
        fetchPosts().then(res => {
            setPosts(res.data)
        })
    }, [])
    const [updateData, setUpdateData] = useState({
        title: "",
        content: "",
        attachment: "",
    });
 

    useEffect(() => {
        socket.current = io("ws://localhost:8900");
        socket.current.on(`getComment-${post._id}`, (_comment) => {
            console.log(_comment, "on comment");
            setComment(prev => ([...prev, _comment]))
        });
    }, []);

    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`/users?userId=${post.authorId}`);
            setUser(res.data);
        };
        fetchUser();
    }, [post.userId]);

    const onChangeUpdate = (e) => {
        const { value, name } = e.target;
        setUpdateData((prev) => ({ ...prev, [name]: value }));

    };

    const onChange = (e) => {
        const { value, name } = e.target;
        setPostData((prev) => ({ ...prev, [name]: value }));

    };

    useEffect(() => {
        commentApi.getComment(post._id).then(res => {
            setComment(res.data)
        })
    }, [])
    const update = () => {
        const updatePosts = {
            title: postData.title,
            content: postData.content,
            img: url,
            authorId: post.authorId,
            userId: profile._id
        }

        updatePost(post._id, updatePosts)
            .then((res) => {
                toggle();
                fetchPosts().then(res => {
                    setPosts(res.data)
                })
            })
    }

    const upload = async (e) => {
        const formData = new FormData()
        formData.append("file", e.target.files[0])
        const res = await uploadImage(formData)
        setUrl(res.data.url)
        console.log("res.url", res);
    }
    const onComment = async () => {
        commentApi.postComment({
            authorId: profile?._id,
            content: postData.content,
            postId: post._id,
        })

        socket.current.emit(`sendComment`, {
            authorId: profile?._id,
            content: postData.content,
            postId: post._id,
            authorInfo: profile,
        })
        setPostData({
            content: ''
        })
    }

    return (
        <div className="PD">
            <div className="PD-left">
                <CardMedia
                    image={post.img}
                    title="Title"
                    style={{ height: "500px", width: "720px", borderRadius: "5px" }}
                />

                <hr />
                <section className="PD-left-comment">

                    <div className="PD-left-comment-top" >
                        <textarea
                            className='PD-left-comment-top-input'
                            name="content"
                            type="text"
                            placeholder="Write a comment"
                            onChange={onChange}
                            value={postData.content}
                        />
                        <LoadingButton className='PD-left-comment-top-button' color="primary" onClick={onComment} >Send</LoadingButton>
                    </div>
                    <br /> <br />
                    <div className='PD-left-comment-content '>
                        {
                            comment?.reverse().map(item => {
                                return <div className="commentPost-User">
                                    <CommentItem item={item} />
                                </div>
                            })
                        }
                    </div>

                    <hr />

                </section>
                <br /><br /><br />
            </div>

            <div className="PD-right">
                <section className="PD-right_head">
                    <Link to="/" style={{ textDecoration: "none" }}>
                        <Button size="small" variant="outlined">
                            <i style={{ marginRight: "10px" }} class="fas fa-arrow-left"></i>
                            Back to home
                        </Button>
                    </Link>{" "}
                </section> <hr />

                <section className="PD-right-infor">
                    <Avatar
                        className="postProfileImg"
                        src={
                            user.profilePicture
                        }
                alt=""
              />
                        <div className='head-author mx-3'>{user.username}</div>
                        <span >{getTimeDistanceFromNow(post.createdAt)}</span>
                    <Button className='head-button' size='small' variant='outlined'>Theo dõi</Button><br />
                     
                    <div className="card-postTop-Right">
                        <div className='card-postTop-Right-icon'>
                            <MoreVert onClick={toggle} />
                        </div>
                        {modal && <div className='card-postTop-Right-modal'>
                            <div className='card-postTop-Right-modal-child' onClick={togglePost}>
                                <EditIcon />Edit
                            </div>
                            <Modal isOpen={postModal} togglePost={togglePost} >
                        <ModalHeader togglePost={togglePost}>Add a post ✍️</ModalHeader>
                        <ModalBody>

                            <Input
                                style={{ marginBottom: '0.5rem' }}
                                name="title"
                                type="text"
                                placeholder="title"
                                onChange={onChangeUpdate}
                                value={updateData.title}
                            />
                            <Input
                                style={{ marginBottom: '0.5rem' }}
                                name="content"
                                type="textarea"
                                placeholder="content"
                                onChange={onChangeUpdate}
                                value={updateData.content}
                            />
                            <img src={url} alt=""
                                style={{ width: '85px', height: '60px' }} />

                            <input

                                type="file"
                                id="file"
                                accept=".png,.jpeg,.jpg"
                                onChange={upload}
                            />

                        </ModalBody>
                        <ModalFooter>
                            <LoadingButton
                                
                                color="primary"
                                onClick={update}
                            >
                                Update
                            </LoadingButton>
                            <Button variant="danger" onClick={toggle}>
                                Cancel
                            </Button>
                        </ModalFooter>

                    </Modal>
                            <div className='card-postTop-Right-modal-child'>
                                <DeleteIcon />Delete
                            </div>
                            <div onClick={toggle} className='card-postTop-Right-modal-child'>
                                <CancelIcon />Cancel
                            </div>
                        </div>}
                    </div>
                    
                   
                   

                </section>
                <section className='PD-right-content'>
                    <p>
                        {post.content}
                    </p>
                </section>



            </div>
        </div>
    );
}

export default HomePostDetail;

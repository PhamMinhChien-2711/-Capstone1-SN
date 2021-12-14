import React,{useState,useEffect,useRef, useContext } from "react";

import './index.scss';
import { LoadingButton } from '@mui/lab';

import { useLocation, Link } from "react-router-dom";
import "./index.scss";
// import img from "../../assets/item.jpg";
import commentApi from "../../api/comment";
import { CardMedia, Avatar } from "@material-ui/core";
import { getTimeDistanceFromNow } from "../../utils/formater";
import { Button } from "@mui/material";
import axios from "axios";
import {  Input,  ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { io } from "socket.io-client"
import { AuthContext } from "../../context/AuthContext";

function HomePostDetail(props) {
    //truyen props thong qua Link
    const location = useLocation();
    const { post } = location.state;
    const [user, setUser] = useState({});
    const [comment, setComment] = useState([]);
    const socket = useRef();
    const { user:profile } = useContext(AuthContext);

    const [postData, setPostData] = useState({
        content: ""
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

    const onChange = (e) => {
        const { value, name } = e.target;
        setPostData((prev) => ({ ...prev, [name]: value }));

    };

    useEffect(() => {
        commentApi.getComment(post._id).then(res => {
            setComment(res.data)
        })
    }, [])

    const onComment = async () => {
        commentApi.postComment({
            authorId: profile._id,
            content: postData.content,
            postId: post._id,
        })

        socket.current.emit(`sendComment`, {
            authorId: profile._id,
            content: postData.content,
            postId: post._id,
            authorInfo: profile,
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

                    <div className="d-flex">
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
                    </div>

                
                {/* <h5 className='body-title'>
                    <span>{user.username}  </span>
                    <span style={{marginLeft: 10}}  >{post.title}</span>
                </h5> */}
                <p className='body-content'>
                    {post.content}
                </p>

             <section className="commentPost">
                <hr></hr>
                <div style={{height: 300,     overflow: "auto"}}>
                {
                    comment?.map(item => {
                        return <div  className="commentPost-User">
                        <span><img
                             className="postProfileImg"
                            src={
                            item?.authorInfo?.profilePicture
                            ?   item?.authorInfo?.profilePicture 
                            : "person/noAvatar.png"
                             }
                             alt=""
                            />    {item?.authorInfo?.username}  </span>
                        <span style={{marginLeft: 10}}>{item?.content} </span>
                          
                    </div>
                    })
                }
                </div>
                <br /><br /><br />
                <hr />
                <div className="commentPost-Send mt-0 d-flex" >
                <Input 
                name="content"
                type="text" 
                 placeholder="Content" 
                 onChange={onChange}
                 value={postData.content}
                 />
                <LoadingButton color="primary" onClick={onComment} >Send</LoadingButton>
                </div>
             </section> 
            </div>
        </div>
    );
}

export default HomePostDetail;

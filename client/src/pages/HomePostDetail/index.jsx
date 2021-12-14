import React,{useState,useEffect} from "react";

import './index.scss';
import { LoadingButton } from '@mui/lab';

import { useLocation, Link } from "react-router-dom";
import "./index.scss";
// import img from "../../assets/item.jpg";
import { CardMedia, Avatar } from "@material-ui/core";
import { getTimeDistanceFromNow } from "../../utils/formater";
import { Button } from "@mui/material";
import axios from "axios";
import {  Input,  ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
function HomePostDetail(props) {
    //truyen props thong qua Link
    const location = useLocation();
    const { post } = location.state;
    const [user, setUser] = useState({});

    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`/users?userId=${post.authorId}`);
            setUser(res.data);
        };
        fetchUser();
    }, [post.userId]);
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

                
                <h5 className='body-title'>
                    <span>{user.username}  </span>
                    <span style={{marginLeft: 10}}  >{post.title}</span>
                </h5>
                <p className='body-content'>
                    {post.content}
                </p>

             <section className="commentPost">
                <hr></hr>
                <div  className="commentPost-User">
                    <span><img
                         className="postProfileImg"
                        src={
                        user.profilePicture
                        ?   user.profilePicture 
                        : "person/noAvatar.png"
                         }
                         alt=""
                        />    {user.username}  </span>
                    <span style={{marginLeft: 10}}  >con này giá bao nhiêu </span>
                      
                </div>
                <div className="commentPost-Send mt-5" >
                <Input name="title" type="text" placeholder="Content" />
                <LoadingButton color="primary" >Send it</LoadingButton>
                </div>
             </section>
            </div>
        </div>
    );
}

export default HomePostDetail;

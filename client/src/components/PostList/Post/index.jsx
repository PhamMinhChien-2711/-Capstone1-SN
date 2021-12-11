import React, { useContext, useState, useEffect } from "react";
import {
    Container,
    Row,
    Input,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from "reactstrap";
import {
    Avatar,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    IconButton,
    Typography,
} from "@material-ui/core";
import MoreVert from "@material-ui/icons/MoreVert";
import FavoriteIcon from "@material-ui/icons/Favorite";
import moment from "moment";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import axios from "axios";


import './style.scss';

export default function Post({ post, onLike }) {
    const [user, setUser] = useState({});
    const [modal, setModal] = useState(false);
    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`/users?userId=${post.authorId}`);
            setUser(res.data);
        };
        fetchUser();
    }, [post.userId]);
    const { user: currentUser } = useContext(AuthContext);

    const toggle = () => setModal(!modal);

    const isLiked = post.likeCount.includes(currentUser._id)

    return (
        <>

            <Card className='card'>
                <div className="card-postTop">
                    <div className="card-postTop-Left">

                        <Avatar></Avatar>
                        <Link to={`/user?userId=${post?.authorId}`}>
                            <span className="card-postTop-Left-postUsername">{user.username}</span>
                        </Link>
                    </div>
                    <div className="card-postTop-Right">
                        <MoreVert style={{ height: "24px", width: "24px", }} onClick={toggle} />

                    </div>
                </div>


                <Link
                    className="link"
                    to={{ pathname: `/home/postid=${post?.postID}`, state: { post } }}
                    style={{ fontWeight: 'bold' }}
                >
                    <CardMedia
                        image={post.img}
                        title="Title"
                        style={{ height: "400px", width: "630px", borderRadius: "5px", }}
                    />
                </Link>
                <CardActions className='card-action'>
                    <div onClick={() => onLike(post._id)}>
                        {/* {
                            isLiked ? "tim do" : "tim den"
                        } */}
                        <IconButton>
                            <FavoriteIcon />
                            <Typography component="span" >
                                {post.likeCount.length}
                            </Typography>
                        </IconButton>
                    </div>
                </CardActions >

                <CardContent className='card-content'>
                    <Typography cariant="h5" color="textPrimary">

                        {post.title}
                    </Typography>
                    <Typography cariant="body2" component="p" color="textSecondary">
                        {""}
                        {post.content}{" "}
                    </Typography>
                </CardContent>

            </Card >

        </>

    );
}

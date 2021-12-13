import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import "./index.scss";
// import img from "../../assets/item.jpg";
import { CardMedia, Avatar } from "@material-ui/core";
import { getTimeDistanceFromNow } from "../../utils/formater";
import { Button } from "@mui/material";
import axios from "axios";
import CommentBox from "../../components/CommentBox";

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
                <section className="PD-left-comment">
                    <textarea type='text' className='PD-left-comment-box' placeholder='write your comment here' />
                    {/* <CommentBox /> */}
                    <div className='PD-left-comment-button'>
                        Bình Luận
                    </div>
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

                <section className="PD-right_content">
                    <div className='PD-right-content-head'>
                        <Avatar></Avatar>
                        <div className="PD-right-content-head-author">{user.username}</div>
                        <span className="PD-right-content-head-button">{getTimeDistanceFromNow(post.createdAt)}</span>
                        <Button size="small" variant="outlined">
                            Theo dõi
                        </Button>
                    </div><br />
                    <div className='PD-right-content-body'>
                        <h5 className="PD-right-content-body-title">{post.title}</h5>
                        <p className="PD-right-content-body-contentPost">{post.content}</p>
                    </div>

                </section>

            </div>
        </div>
    );
}

export default HomePostDetail;

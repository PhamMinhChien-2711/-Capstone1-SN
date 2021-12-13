import React,{useState,useEffect} from "react";
import { useLocation, Link } from 'react-router-dom';
import './index.scss';
// import img from "../../assets/item.jpg";
import {
    CardMedia, Avatar
} from "@material-ui/core";
import { getTimeDistanceFromNow } from "../../utils/formater"
import { Button } from '@mui/material';
import axios from "axios";

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
        <div className='HomePostDetail'>
            <div className='left'>

                <CardMedia
                    image={post.img}
                    title="Title"
                    style={{ height: "500px", width: "700px", borderRadius: "5px", }} />
                {/* <section className='body'>
                   
                </section> */}
                 <hr/>
                <section className='foot'>
                <br/>
                </section>
            </div>
          

           
            <div className='comment'>
                <section className='head'>
                    <Link to='/' style={{ textDecoration: 'none' }}>
                        <Button size='small' variant='outlined' ><i class="fas fa-arrow-left"></i>Back to home</Button>
                    </Link> <br /> <hr />

                    <div className="d-flex">
                    <img
                         className="postProfileImg"
                        src={
                        user.profilePicture
                        ?   user.profilePicture
                        : "person/noAvatar.png"
                }
                alt=""
              />
                        <div className='head-author mx-3'>{user.username}</div>
                        <span>{getTimeDistanceFromNow(post.createdAt)}</span>
                    <Button className='head-button' size='small' variant='outlined'>Theo dõi</Button><br />
                    </div>
                    
                </section>
                <h5 className='body-title'>
                    {post.title}
                </h5>
                <p className='body-content'>
                    {post.content}
                </p>
             
            </div>
            
        </div>

    );
}

export default HomePostDetail;
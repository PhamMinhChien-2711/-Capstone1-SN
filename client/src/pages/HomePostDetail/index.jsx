import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import './index.scss';
import img from "../../assets/item.jpg";
import {
    CardMedia, Avatar
} from "@material-ui/core";
import { getTimeDistanceFromNow } from "../../utils/formater"
import { Button } from '@mui/material';
function HomePostDetail(props) {

    //truyen props thong qua Link
    const location = useLocation();
    const { post } = location.state;
    return (
        <div className='HomePostDetail'>
            <div className='left'>

                <CardMedia
                    image={img}
                    title="Title"
                    style={{ height: "500px", width: "700px", borderRadius: "5px", }} />
                {/* <section className='body'>
                   
                </section> */}
                <section className='foot'>

                </section>
            </div>
            <div className='comment'>
                <section className='head'>
                    <Link to='/' style={{ textDecoration: 'none' }}>
                        <Button size='small' variant='outlined' ><i class="fas fa-arrow-left"></i>Back to home</Button>
                    </Link> <br /> <hr />

                    <div className="d-flex">
                        <Avatar></Avatar>
                        <div className='head-author mx-3'>post.authorId</div>
                    </div>
                    <span>{getTimeDistanceFromNow(post.createdAt)}</span>
                    <Button className='head-button' size='small' variant='outlined'>Theo dõi</Button><br />
                </section>
                <h4 className='body-title'>
                    {post.title}
                </h4>
                <p className='body-content'>
                    {post.content}
                </p>
            </div>
            <hr></hr>
        </div>

    );
}

export default HomePostDetail;
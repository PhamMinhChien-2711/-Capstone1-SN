import React from 'react';
import { Link } from 'react-router-dom';
import { Col } from 'reactstrap';
import './index.scss';
import { getTimeDistanceFromNow } from "../../../utils/formater"
import {
    Avatar,
  
} from "@material-ui/core";

function HoiDapItem(props) {
    const { post, classname } = props;

    return (
        <Col lg='6' className={classname + 'Item'}>
            <div className='Item-title d-flex'>
            <Avatar
                         className="postProfileImg"s
                        src={
                        post?.authorInfo?.profilePicture
                }
                      alt=""
              />
            <Link to={`/user?userId=${post?.authorId}`} style={{ textDecoration: 'none' }}>
            <label className='Author' style={{paddingLeft: 10}}>{post?.authorInfo?.username}</label>               
            </Link>  
            <span className='CreatedAt'>{getTimeDistanceFromNow(post.createdAt)} </span><br />
                </div>        
            
            <h6 className='Title'>{post.content}</h6>
            <Link className='Item-link' to={{ pathname: `/hoidap/postid=${post._id}`, state: { post } }}>Detail</Link>
            <hr />
        </Col >
    );
}

export default HoiDapItem;
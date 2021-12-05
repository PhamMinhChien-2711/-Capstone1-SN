import React from 'react';
import { Link } from 'react-router-dom';
import { Col } from 'reactstrap';
import './index.scss';

function HoiDapItem(props) {
    const { post, classname } = props;

    return (
        <Col lg='6' className={classname + 'Item'}>
            <span className='Id'>#PostID{post.postID}</span> <br />
            <label className='Author'>{post.author}</label>
            <span className='CreatedAt'>{post.createdAt} hours ago</span><br />
            <h6 className='Title'>{post.title}</h6>
            <Link className='Item-link' to={{ pathname: `/hoidap/postid=${post.postID}`, state: { post } }}>Detail</Link>
            <hr />
        </Col >
    );
}

export default HoiDapItem;
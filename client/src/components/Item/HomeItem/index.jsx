import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Col } from 'reactstrap';
import './index.scss';

function HomeItem(props) {
    const { post, classname } = props;

    return (
        <Col lg='6' className={classname + 'Item'}>
            <span className='Id'>#PostID{post?.postID}</span> <br />
            <label className='Author'>{post?.author}</label>
            <span className='CreatedAt'>{post?.createdAt} hours ago</span><br /><span className='Star'>Stars: {post?.stars}</span>
            <p className='Title'>{post?.title}</p>
            <Link className='Item-link' to={{ pathname: `/home/postid=${post?.postID}`, state: { post } }}>Detail</Link>
            <hr />
        </Col >
    );
}

export default HomeItem;
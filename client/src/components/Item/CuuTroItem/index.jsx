import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Col } from 'reactstrap';
import './index.scss';
import moment from 'moment'

function CuuTroItem(props) {
    const { post, classname } = props;
    
    return (
        <Col lg='6' className={classname + 'Item'}  style={{marginLeft: '80px'}}>
            <span className='Id'>#PostID: {post._id}</span> <br/>
            <label className='Author' style={{width: '600px'}}>{post.name}</label>
            <span className='CreatedAt' style={{width: '300px', display: 'flex', marginLeft: '-3px'}}> {moment(post.createdAt).format('MMMM Do YYYY, h:mm')}{' '}hours ago</span><br />
            <h6 className='Title' style={{width: '1000px', display: 'flex'}}>{post.title}</h6>
            <Link className='Item-link' to={{ pathname: `/cuutro/${post._id}`, state: { post } }} style={{textDecoration: 'underline', fontStyle: 'italic'}}>Detail</Link>
            <hr />
        </Col >
    );
}

export default CuuTroItem;
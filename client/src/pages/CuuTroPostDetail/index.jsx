import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import './index.scss';

import { Button } from '@mui/material';
function CuuTroPostDetail(props) {

    //truyen props thong qua Link
    const location = useLocation();
    const { post } = location.state;
    return (
        <div className='HomePostDetail'>
            <div className='left'>
                <section className='head'>
                    <Link to='/cuutro' style={{ textDecoration: 'none' }}>
                        <Button size='small' variant='outlined' ><i class="fas fa-arrow-left"></i>Back</Button>
                    </Link> <br /> <hr />
                </section>
                <section className='body'>
                    <h3 className='body-title'>
                        {post.title}
                    </h3>
                    <p className='body-content'>
                        {post.content}
                    </p>
                </section>
                <section className='img'>
                    <img src='https://images.unsplash.com/photo-1635365349638-c79256d73f79?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80' />
                    <img src='https://images.unsplash.com/photo-1635365349638-c79256d73f79?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80' />

                </section>
                <hr />
                <section className='comment'>
                    comment
                </section>
            </div>
            <div className='right'>
                <lable className='right-author'>{post.author}</lable>
                <Button className='right-button' size='small' variant='outlined' >Theo dõi</Button><br />
                <span>Đã đăng khoảng {post.createdAt} giờ trước</span>
                <hr />
            </div>
        </div>
    );
}

export default CuuTroPostDetail;
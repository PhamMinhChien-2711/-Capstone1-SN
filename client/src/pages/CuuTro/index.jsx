import React, { useState } from 'react';
import { Button } from '@mui/material';
import './index.scss';
import { Container, Col } from 'reactstrap';
import { CuuTroPosts } from '../../rawData/CuuTroPosts';
import CuuTroItem from '../../components/Item/CuuTroItem';

const CuuTro = (props) => {
    const time = new Date();
    const now = time.getDate() + '/' + (time.getUTCMonth() + 1) + '/' + time.getUTCFullYear() + ' ' +
        time.getHours() + ':' + time.getMinutes();
    console.log(time.now);
    return (
        <div className='CuuTro'>
            <div className="CuuTro-button">
                <Button size='medium' variant="contained">Đăng cứu trợ</Button>
            </div>

            <div className='CuuTro-body'>
                <div className="left">
                    <h5 style={{ marginLeft: '5rem' }}>Các bài post cứu trợ được cập nhật lúc :{' '}
                        <span style={{ color: 'blue' }}>{now}</span>
                    </h5>
                    <hr />
                    <div className='CuuTro-posts'>
                        <Container>
                            {CuuTroPosts.map((post) => {
                                return <CuuTroItem post={post} />
                            })}
                        </Container>
                    </div>
                </div>
                <div className='right'>
                    <h4>Đáng quan tâm</h4><hr />
                    <h5>Tôi không thể sống nếu thiếu nó</h5>
                    <span>created by Nhat Long </span>
                    <hr />
                    <h5>Làm ơn hãy giúp tôi</h5>
                    <span>created by Elon </span>
                </div>
            </div>
        </div >
    );
}

export default CuuTro;
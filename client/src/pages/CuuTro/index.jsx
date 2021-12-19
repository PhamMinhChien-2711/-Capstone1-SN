import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import './index.scss';
import { Container, Col } from 'reactstrap';
import { CuuTroPosts } from '../../rawData/CuuTroPosts';
import CuuTroItem from '../../components/Item/CuuTroItem';
import axios from 'axios';
import { API_URL } from '../../../src/actions/type'
import { useHistory } from 'react-router-dom'


const CuuTro = (props) => {
    const [post, setPost] = useState([]);

    const history = useHistory();

    async function CallAPI() {
        try {
            const res = await axios.get(`${API_URL}/api/support/listSupport`)
            if (res.data.success) {
                setPost(res.data.supportPost)
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        CallAPI();
    }, [])

    const deletePost = async (_id) => {
        // e.preventDefault()
        const response = await axios.delete(`${API_URL}/api/support/deletedpost/${_id}`, {_id})
        const newPost = post.filter((item)=>
            item._id === response.data._id ? false : true
        )
        setPost(newPost)
        
        console.log('dlete: ', response)
    } 

    const time = new Date();
    const now = time.getDate() + '/' + (time.getUTCMonth() + 1) + '/' + time.getUTCFullYear() + ' ' +
        time.getHours() + ':' + time.getMinutes();

    return (
        <div className='CuuTro'>
            <div className="CuuTro-button" onClick={() => history.push('/newPostSupport')}>
                <Button size='medium' variant="contained">Đăng cứu trợ</Button>
            </div>

            <div className='CuuTro-body'>
                <div className="left">
                    <h5 style={{ marginLeft: '5rem', width: '400px', display: 'flex', marginTop: '50px' }}>Các bài post cứu trợ được cập nhật lúc :{' '}{now}
                        {/* <span style={{ color: 'blue' }}>{now}</span> */}
                    </h5>
                    <hr />
                    <div className='CuuTro-posts'>
                        <Container>
                            {post.map((post, index) => {
                                return (
                                    <div>
                                        <CuuTroItem post={post} />
                                        <input
                                            type="button"
                                            value="Delete"
                                            className="button-delete"
                                            onClick={()=>window.location.reload(false)+deletePost(post._id)}
                                        />
                                    </div>
                                )
                            })}
                        </Container>
                    </div><hr />
                </div>
                <div className='right' style={{ marginTop: '40px' }}>
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
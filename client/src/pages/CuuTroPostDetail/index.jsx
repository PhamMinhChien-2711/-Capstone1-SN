import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import './index.scss';

import { Button } from '@mui/material';
function CuuTroPostDetail(props) {

    //truyen props thong qua Link
    const location = useLocation();
    const [post, setPost] = useState({ title: '', content: '', postImage: '' })
    const [status, setStatus] = useState(true)
    // const [buttonStatus, setButtonStatus] = useState(true)
    // const { post } = location.state;
    const loadPost = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/support/listDetail/${location.pathname.split('/')[2]}`)
            console.log(location)
            console.log(response)
            if (response.data.success) {
                setPost(response.data.findPost)

            }
            console.log('location: ', location)
        } catch (error) {

        }
    }
    useEffect(() => {
        loadPost();
    }, [])
    const editPost = () => {
        return (
            <div>
                <section className='body'>
                    <input onChange={handleSubmit} name="title" className='body-title' defaultValue={post.title} style={{ border: '1px solid rgb(184, 184, 184)', borderRadius: '5px', paddingLeft: '5px', width: '98%', height: '35px', marginBottom: '7px' }}>
                    </input><br />
                    <input onChange={handleSubmit} name="content" className='body-content' defaultValue={post.content} style={{ border: '1px solid rgb(184, 184, 184)', borderRadius: '5px', paddingLeft: '5px', width: '98%', height: '35px', marginBottom: '7px' }}>
                    </input>
                </section>
                <section className='img'>
                    <img src={post.postImage} />
                </section>
                <section className='change-img' style={{ marginTop: '10px', marginBottom: '10px' }}>
                    <input type="file"></input>
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
                <div className='right'>
                    <lable className='right-author'>{post.author}</lable>
                    <Button className='right-button' size='small' variant='outlined' >Theo dõi</Button><br />
                    <span>Đã đăng khoảng {post.createdAt} giờ trước</span>
                    <hr />
                </div>
            </div>
        );
    }
}
export default CuuTroPostDetail;
import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import './index.scss';
import axios from 'axios'
import { API_URL } from '../../actions/type'
import Map from '../../components/Map/Map'
import ViewFullImage from '../../components/ViewFullImage/ViewFullImage'


import { Button } from '@mui/material';
function CuuTroPostDetail(props) {

    const key = 'AIzaSyCgRBeGCNcwSBnC4ppydD7HTZzgJU1hIYI';
    //truyen props thong qua Link
    const location = useLocation();
    const [post, setPost] = useState({ title: '', content: '', postImage: '', visible: false })
    const [status, setStatus] = useState(true)
    // const [buttonStatus, setButtonStatus] = useState(true)
    // const { post } = location.state;
    const loadPost = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/support/listDetail/${location.pathname.split('/')[2]}`)
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
                <div className="EditPost-button" style={{ width: '98%' }}>
                    <form onClick={callAPI}>
                        <Button size='medium' variant="contained" onClick={changeStatus}>Lưu bài viết</Button>
                    </form>
                </div>
            </div>
        )
    }
    const contentPost = () => {
        return (
            <div>
                <section className='body'>
                    {/* <h3 className='body-title'>
                        {post._id}
                    </h3> */}
                    <h3 className='body-title' name="title">
                        {post.title}
                    </h3>
                    <p className='body-content' name="content">
                        {post.content}
                    </p>
                </section>
                <section className='img'>
                    <img src={post.postImage} onClick={() => setPost({ ...post, visible: true })} />
                </section>


            </div>
        )
    }
    const checkStatus = () => {
        if (status === true) {
            return contentPost()
        } else {
            return editPost()
        }
    }
    const changeStatus = () => {
        setStatus(!status)
    }


    const callAPI = async (e) => {
        e.preventDefault()
        const res = await axios.put(`${API_URL}/api/support/${location.pathname.split('/')[2]}`, {
            title: post.title,
            content: post.content,
            postImage: post.postImage
        })
        if (res?.data?.success) {
            setPost(res?.data?.updatePost)
        }
        // setPost(res?.data?.updatePost)
        console.log('res: ', res)
    }



    const handleSubmit = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value })
    }
    return (
        <div className='HomePostDetail'>
            <div className='Button-onclick'>
                {/* {checkButton()} */}
                <div className="EditPost-button">
                    <form>
                        <Button size='medium' variant="contained" onClick={changeStatus}>Sửa bài viết</Button>
                    </form>
                </div>
            </div>

            <div className='left'>
                <section className='head'>
                    <Link to='/cuutro' style={{ textDecoration: 'none' }}>
                        <Button size='small' variant='outlined' ><i class="fas fa-arrow-left"></i>Back</Button>
                    </Link> <br /> <hr />
                </section>
                {/* {contentPost()} */}
                {checkStatus()}
                <hr />
                <section className='comment'>
                    comment
                </section>
            </div>
            <div className='right'>
                <lable className='right-author'>{post.name}</lable>
                <Button className='right-button' size='small' variant='outlined' >Theo dõi</Button><br />
                <span>Đã đăng khoảng {post.createdAt} giờ trước</span>
                <hr />

                <div style={{ marginTop: '4%', marginLeft: '20px', width: '130%' }}>
                    <Map
                        lat={post.lat}
                        lng={post.lng}
                        label={post.label}
                        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${key}&callback=initMap`}
                        loadingElement={<div style={{ height: `100%` }} />}
                        containerElement={<div style={{ height: `90vh`, margin: `auto`, border: '2px solid black' }} />}
                        mapElement={<div style={{ height: `100%` }} />}
                    />
                </div>
            </div>
            {post.visible ? (<ViewFullImage url={post.postImage} onClick={()=>setPost({...post,visible:false})}/>) : null}
        </div>
    );
}

export default CuuTroPostDetail;
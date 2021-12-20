import React, { useState,useContext,useEffect } from 'react';
import { Button } from '@mui/material';
import './index.scss';
import { AuthContext } from "../../context/AuthContext";
import { HoiDapPosts } from '../../rawData/HoiDapPosts';
import HoiDapItem from '../../components/Item/HoiDapItem';
import { Container, Row, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { LoadingButton } from '@mui/lab';
import { createPost, fetchPosts } from "../../api/postHoiDap";
import { uploadImage } from "../../api/upload";

const HoiDap = (props) => {
    const { user, dispatch } = useContext(AuthContext);
    const [url, setUrl] = useState("");
    const [postData, setPostData] = useState({
        title: "",
        content: "",
        attachment: "",
    });
    useEffect(() => {
        fetchPosts().then(res => {
            setPosts(res.data)
        })
    }, [])
    const [posts, setPosts] = useState([])
    const [modal, setModal] = useState(false);
    // const [postLoading, setPostLoading] = useState(false);
    const onChange = (e) => {
        const { value, name } = e.target;
        setPostData((prev) => ({ ...prev, [name]: value }));

    };
    const toggle = () => setModal(!modal);
    const post = async () => {
        
        createPost({

            title: postData.title,
            content: postData.content,
            img:url,
            authorId: user._id,
        })
            .then((res) => {
                console.log(res, "post res");
                
                toggle();
                fetchPosts().then(res => {
                    setPosts(res.data)
                })

            })
            
    };
    const upload = async (e) => {
        const formData = new FormData()
        formData.append("file", e.target.files[0])
        const res = await uploadImage(formData)
        setUrl(res.data.url)
        console.log("res.url", res);
    }
    return (
        <div className='HoiDap'>
            <div className="HoiDap-button">
                <Button  onClick={toggle} color='error' size='medium' variant="contained">Đặt câu hỏi ?</Button>
                <Modal isOpen={modal} toggle={toggle}>
                        <ModalHeader  toggle={toggle}>Add a post ✍️</ModalHeader>
                        <ModalBody>
                        {/* <Input
                                style={{ marginBottom: '0.5rem' }}
                                name="title"
                                type="text"
                                placeholder="title"
                                onChange={onChange}
                                value={postData.title}
                            /> */}
                            <Input
                                style={{ marginBottom: '0.5rem' }}
                                name="content"
                                type="textarea"
                                placeholder="Bạn muốn hỏi gì...."
                                onChange={onChange}
                                value={postData.content}
                            />
                            <img src={url} alt=""
                                style={{ width: '85px', height: '60px' }} />

                            <input

                                type="file"
                                id="file"
                                accept=".png,.jpeg,.jpg"
                                onChange={upload}
                            />
                        </ModalBody>
                        <ModalFooter>
                            <LoadingButton color="primary" onClick={post}  >POST IT</LoadingButton>
                            <Button variant='danger' onClick={toggle}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
            </div>

            <div className='HoiDap-body'>
                <div className="left">
                    <div className='HoiDap-posts'>
                        <Container>
                            {posts.map((post) => {
                                return <HoiDapItem post={post} />
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

export default HoiDap;
import React, { useState } from 'react';
import { Button } from '@mui/material';
import './index.scss';

import { HoiDapPosts } from '../../rawData/HoiDapPosts';
import HoiDapItem from '../../components/Item/HoiDapItem';
import { Container, Row, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { LoadingButton } from '@mui/lab';

const HoiDap = (props) => {
    
    const [modal, setModal] = useState(false);
    
    const [postLoading, setPostLoading] = useState(false);
    const toggle = () => setModal(!modal);
    return (
        <div className='HoiDap'>
            <div className="HoiDap-button">
                <Button  onClick={toggle} color='error' size='medium' variant="contained">Đặt câu hỏi ?</Button>
                <Modal isOpen={modal} toggle={toggle}>
                        <ModalHeader  toggle={toggle}>Add a post ✍️</ModalHeader>
                        <ModalBody>
                            <Input name="title" type="text" placeholder="title" />
                            <Input name="content" type="text"  placeholder="content"   />
                        </ModalBody>
                        <ModalFooter>
                            <LoadingButton loading={postLoading} color="primary" onClick={toggle}  >POST IT</LoadingButton>
                            <Button variant='danger' onClick={toggle}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
            </div>

            <div className='HoiDap-body'>
                <div className="left">
                    <div className='HoiDap-posts'>
                        <Container>
                            {HoiDapPosts.map((post) => {
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
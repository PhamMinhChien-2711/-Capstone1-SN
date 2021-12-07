
import './index.scss';
import userr from '../../assets/user.jpg';
import { Button, Col, Container, Row } from 'reactstrap';
import React, { useContext } from 'react';
import { AuthContext } from "../../context/AuthContext";

function User(props) {
    const { user, dispatch } = useContext(AuthContext);
    
    return (

        <div className='User'>
            <Container >
                <Row>
                    <Col lg='2'> </Col>
                    <Col lg='4'>
                        <img src={userr} alt='' />
                    </Col>
                    <Col lg='6' className='User-infor'>
                        <h4>Your Information </h4>
                        <table>
                            <tr>
                                <td>FullName: </td>
                                <td>{user?.username}</td>
                            </tr>
                            <tr>
                                <td>Email: </td>
                                <td>{user.email}</td>
                            </tr>
                            <tr>
                                <td>Phone: </td>
                                <td>{user._id}</td>
                            </tr><br />
                            <tr>
                                <Button varriant='contained'>Change your password</Button>
                            </tr>
                        </table>
                    </Col>
                </Row>
            </Container>
        </div >
    );
}

export default User;
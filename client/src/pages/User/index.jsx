
import './index.scss';
import userr from '../../assets/user.jpg';
import { Button, Col, Container, Row } from 'reactstrap';
import React, { useContext } from 'react';
import { AuthContext } from "../../context/AuthContext";

function User(props) {
    const { user, dispatch } = useContext(AuthContext);

    return (

        <div className='User'>
            <div className='User-left'>
                <img src={userr} alt='' />
            </div>
            <div className='User-right'>
                <span className="User-right__userName">elon.musk</span>
                <span className="User-right__button-edit">Edit profile</span>
                <span className="User-right__button-setting"><i class="fas fa-cogs"></i></span><br />
                <br />
                <span className="User-right__post"><strong>1</strong> post</span>
                <span className="User-right__follower"><strong>1414</strong> followers</span>
                <span className="User-right__following"><strong>122</strong> following</span>
                <div className="User-right__name">Elon Musk</div>

            </div>
            {/* <>
                    <Col lg='2'> </Col>
                    <Col lg='4'>
                        <img src={userr} alt='' />
                    </Col>
                    <Col lg='6' className='User-infor'>
                        <h4>Your Information </h4>
                        <table>
                            <tr>
                                <td>FullName: </td>
                                <td>Elon Musk</td>
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
                </> */}

        </div >
    );
}

export default User;
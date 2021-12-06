import { AllOutSharp, SearchOutlined } from '@mui/icons-material';
import React, { useContext } from 'react';
import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom';
import { Col, Container, Row, InputGroupAddon, Input, InputGroup, Button } from 'reactstrap';
import './index.scss';
import logo from '../../assets/logo.jpg';
import headImg from '../../assets/headimg.png';
import userAv from '../../assets/user.jpg';
import { Avatar, IconButton } from '@mui/material';
// import { useSelector } from 'react-redux'
import { AuthContext } from "../../context/AuthContext";
// import store from '../../redux/store';   

const active = {
    fontWeight: 'bold',
    borderBottom: 'solid 3px black'
}

function Header(props) {
    const { user, dispatch } = useContext(AuthContext);
    console.log(user, "user");

    const logout = () => {
         localStorage.clear()
         dispatch({ type: "LOGIN_FAILURE", payload: null });
    }

    return (
        <div className='Header'>
            <Container>
                <Row className='Header-row'>
                    <Col xs='12' sm='12' md='12' lg='6' className='Header-col-1'>
                        <img src={logo} alt='logo snpo' />
                        <NavLink activeStyle={active} className='Header-col-1-link' exact to='/' >Trang chủ</NavLink>
                        <NavLink activeStyle={active} className='Header-col-1-link' to='/hoidap' >Hỏi đáp</NavLink>
                        <NavLink activeStyle={active} className='Header-col-1-link' to='/cuutro' >Cứu trợ</NavLink>
                        <NavLink activeStyle={active} className='Header-col-1-link' to='/shop' >Shop</NavLink>

                    </Col>
                    <Col xs='12' sm='12' md='12' lg='4' className='Header-col-2'>
                        <InputGroup>
                            <Input />
                            <InputGroupAddon addonType="append">
                                <Button color="primary">Search <SearchOutlined /></Button>
                            </InputGroupAddon>
                        </InputGroup>
                    </Col>
                    <Col xs='12' sm='12' md='12' lg='2' className='Header-col-3'>
                        {
                            user?
                                <>
                                    <NavLink to='/user'>
                                        <Avatar
                                            className='img'
                                            alt="Remy Sharp"
                                            src={userAv}
                                            sx={{ width: 56, height: 50 }}
                                        />
                                    </NavLink>
                                    {/* <div onClick={logout} className="div"> Dang nhap</div> */}
                                    <IconButton onClick={logout} endIcon={<AllOutSharp />}><i class="fas fa-sign-out-alt"></i></IconButton>
                                </>
                                :
                                <NavLink activeStyle={active} className='Header-col-1-link' to='/login' >Đăng nhập</NavLink>
                        }
                    </Col>
                </Row>
            </Container>
            <Row className='Header-row-2'><img style={{ width: '100%' }} src={headImg} alt='head img' /></Row>
        </div>

    );
}

export default Header;
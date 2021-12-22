import { AllOutSharp, SearchOutlined } from "@mui/icons-material";
import React, { useContext, useState } from "react";
import { BrowserRouter as Router, Switch, Route, NavLink } from "react-router-dom";
import {
  Col,
  Container,
  Row,
  InputGroupAddon,
  Input,
  InputGroup,
  Button,
} from "reactstrap";
import "./index.scss";
import logo from "../../assets/logo.jpg";
import headImg from "../../assets/headimg.png";
import userAv from "../../assets/user.jpg";
import { UncontrolledCarousel } from "reactstrap";
import { Avatar, IconButton } from "@mui/material";
// import { useSelector } from 'react-redux'
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
// import store from '../../redux/store';

const active = {
  opacity: "1",
  borderBottom: "solid 3px black",
};

const itemHeadImage = [
  {
    src: "/assets/headimg.png",

    header: "Welcome to social network for Pet owner",
  },
  {
    src: "/assets/0.jpg",
  },
  {
    src: "/assets/2.jpg",
  },
  {
    src: "/assets/5.jpeg",
    caption: "Thanks for choose us",
    header: "Hope you have the best experience here",
  },
];

function Header(props) {
  const { user, dispatch } = useContext(AuthContext);
  console.log(user, "user");

  const logout = () => {
    localStorage.clear();
    dispatch({ type: "LOGIN_FAILURE", payload: null });
    toast.success("Hẹn gặp lại bạn !");
  };

  return (
    <div className='Header'>
      <Container>
        <Row className='Header-row'>
          <Col xs='12' sm='12' md='12' lg='6' className='Header-col-1'>
            <img
              src='/favicon.ico'
              style={{ width: "70px", height: "70px" }}
              alt='logo snpo'
            />
            <NavLink activeStyle={active} className='Header-col-1-link' exact to='/'>
              Trang chủ
            </NavLink>
            <NavLink activeStyle={active} className='Header-col-1-link' to='/hoidap'>
              Hỏi đáp
            </NavLink>
            <NavLink activeStyle={active} className='Header-col-1-link' to='/cuutro'>
              Cứu trợ
            </NavLink>
            <NavLink activeStyle={active} className='Header-col-1-link' to='/shop'>
              Shop
            </NavLink>
          </Col>
          <Col xs='12' sm='12' md='12' lg='4' className='Header-col-2'>
            <InputGroup>
              <Input />
              <InputGroupAddon addonType='append'>
                <Button color='primary'>
                  Search <SearchOutlined />
                </Button>
              </InputGroupAddon>
            </InputGroup>
          </Col>
          <Col xs='12' sm='12' md='12' lg='2' className='Header-col-3'>
            <>
              <NavLink to={`/user?userId=${user._id}`}>
                <Avatar
                  className='img'
                  alt='Remy Sharp'
                  src={user.profilePicture}
                  sx={{ width: 56, height: 50 }}
                />
              </NavLink>
              {/* <div onClick={logout} className="div"> Dang nhap</div> */}
              <NavLink style={{ textDecoration: "none" }} to='/'>
                <IconButton onClick={logout} endIcon={<AllOutSharp />}>
                  <i class='fas fa-sign-out-alt'></i>
                </IconButton>
              </NavLink>
            </>
          </Col>
        </Row>
      </Container>
      <>
        <div className='Header-row-2'>
          {/* <img src='https://www.seekpng.com/png/detail/3-38652_all-dogs-banner.png' alt='head img' /> */}
          <UncontrolledCarousel items={itemHeadImage} />
        </div>
      </>
    </div>
  );
}

export default Header;

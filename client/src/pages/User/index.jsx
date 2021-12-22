import { LoadingButton } from "@mui/lab";
import "./index.scss";
import userr from "../../assets/user.jpg";
import { Button, Col, Container, Row } from "reactstrap";
import React, { useContext, useState, useEffect } from "react";
import { Input, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { uploadImage } from "../../api/upload";
import { useLocation, Link } from "react-router-dom";
import { useParams } from "react-router";
import userApi from "../../api/user";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { seo } from "../../utils/seo";

function User(props) {
  const { user: currentUser } = useContext(AuthContext);
  console.log("currentUser: ", currentUser);

  const [user, setUser] = useState();
  const location = useLocation();
  const userId = location.search.split("=")[1];
  const [modal, setModal] = useState(false);

  const [postData, setPostData] = useState({
    username: "",
    email: "",
  });

  useEffect(() => {
    seo("Người dùng");
    userApi.getUser(userId).then((res) => {
      setUser(res.data);
    });
  }, []);

  const handleClick = async (e) => {
    const conversation = {
      senderId: currentUser?._id,
      receiverId: userId,
    };
    if (currentUser._id === userId || userId == null) {
      try {
        const res = await axios.get("/conversations/" + currentUser._id);
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const res = await axios.post(`/conversations`, conversation);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const update = () => {
    const userInfo = {
      username: postData.username,
      email: postData.email,
      profilePicture: url,
      userId: userId,
    };

    userApi.updateUser(currentUser?._id, userInfo).then((res) => {
      toggle();
      userApi.getUser().then((res) => {
        setUser(res.data);
      });
    });
  };
  const toggle = () => setModal(!modal);
  const onChange = (e) => {
    const { value, name } = e.target;
    setPostData((prev) => ({ ...prev, [name]: value }));
  };
  const [url, setUrl] = useState("");

  const upload = async (e) => {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    const res = await uploadImage(formData);
    setUrl(res.data.url);
  };
  return (
    <div className='User'>
      <div className='User-left'>
        <img src={user?.profilePicture} alt='' />
      </div>
      <div className='User-right'>
        <span className='User-right__userName'>{user?.username}</span>
        <Link style={{ textDecoration: "none" }} to={`/messenger`}>
          <span className='User-right__button-edit' onClick={handleClick}>
            Messages
          </span>
        </Link>
        <span className='User-right__button-edit' onClick={toggle}>
          Edit profile
        </span>
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Update User ✍️</ModalHeader>
          <ModalBody>
            <Input
              style={{ marginBottom: "0.5rem" }}
              name='username'
              type='text'
              placeholder='Username'
              onChange={onChange}
              value={postData.username}
            />
            <Input
              style={{ marginBottom: "0.5rem" }}
              name='email'
              type='text'
              placeholder='Email'
              onChange={onChange}
              value={postData.email}
            />
            <img style={{ width: "85px", height: "60px" }} src={url} alt='' />

            <input type='file' id='file' accept='.png,.jpeg,.jpg' onChange={upload} />
          </ModalBody>
          <ModalFooter>
            <LoadingButton color='primary' onClick={update}>
              Update
            </LoadingButton>
            <Button variant='danger' onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>

        <span className='User-right__button-setting'>
          <i class='fas fa-cogs'></i>
        </span>
        <br />
        {/* <input className="User-right__avatar"
                  type="file"
                  id="file"
                  accept=".png,.jpeg,.jpg"
                  onChange={upload}
                 >
                 </input>  */}
        <br />
        <br />
        <span className='User-right__post'>
          <strong>1</strong> post
        </span>
        <span className='User-right__follower'>
          <strong>{/* {user?.followers} */} </strong> followers
        </span>
        <span className='User-right__following'>
          <strong>122</strong> following
        </span>
        <div className='User-right__name'>{user?.username}</div>
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
    </div>
  );
}

export default User;

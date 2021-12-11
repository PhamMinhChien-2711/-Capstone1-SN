
import './index.scss';
import userr from '../../assets/user.jpg';
import { Button, Col, Container, Row } from 'reactstrap';
import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { useLocation, Link } from 'react-router-dom'
import { useParams } from "react-router";
import userApi from "../../api/user"
const querystring = require("querystring");


function User(props) {
    const [currentUser, setcurrentUser] = useState();
    const location = useLocation();
    console.log("useLocation", useLocation());
    const userId = location.search.split("=")[1]
    console.log("userId", userId);
    const { user } = useContext(AuthContext);
    console.log(user._id);

    useEffect(() => {
        userApi.getUser(userId).then((res) => {
            console.log("res", res);
            setcurrentUser(res.data)
        })
    }, []);
    const handleClick = async (e) => {

        const conversation = {
            senderId: user._id,
            receiverId: userId,
        }
        if (user._id === userId || userId== null) {
            try {
                const res = await axios.get("/conversations/" + user._id);
            } catch (err) {
                console.log(err);
            }
        }
        else {
            try {
                const res = await axios.post(`/conversations`,conversation );
            } catch (err) {
                console.log(err);
            }
        }
    };

    
    // const [url, setUrl] = useState("");


    // const upload = async (e) => {
    //     const formData = new FormData()
    //     formData.append("file", e.target.files[0])
    //     const res = await uploadImage(formData)
    //     setUrl(res.data.url)
    //     console.log("res.url",res);
    // }
    return (

        <div className='User'>

            <div className='User-left'>


                <img src={userr} alt='' />
            </div>
            <div className='User-right'>
                <span className="User-right__userName">
                    {currentUser?.username}
                </span>
                <Link to={`/messenger`}><span className="User-right__button-edit" onClick={handleClick}>Messages</span></Link>
                <span className="User-right__button-edit">Edit profile</span>
                <span className="User-right__button-setting"><i class="fas fa-cogs"></i></span><br />
                {/* <input className="User-right__avatar"
                  type="file"
                  id="file"
                  accept=".png,.jpeg,.jpg"
                  onChange={upload}
                 >
                 </input>  */}
                <br />
                <br />
                <span className="User-right__post"><strong>1</strong> post</span>
                <span className="User-right__follower"><strong>{currentUser?.followers} </strong> followers</span>
                <span className="User-right__following"><strong>122</strong> following</span>
                <div className="User-right__name">{currentUser?.username}</div>

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
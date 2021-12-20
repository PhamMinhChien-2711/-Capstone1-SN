import React, { useState, useContext, useEffect, useRef, } from "react";

import {
    Button,
} from "@material-ui/core";
import { AuthContext } from "../../context/AuthContext";
import { LoadingButton } from "@mui/lab";
import CreateIcon from "@mui/icons-material/Create";
import "./index.scss";
import PostList from "../../components/PostList";

import { createPost, fetchPosts, likePost } from "../../api/post";
import { uploadImage } from "../../api/upload";
import {
    Container,
    Row,
    Col,
    Input,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from "reactstrap";
import Post from "../../components/PostList/Post";
const active = {
    borderBottom: "3px solid black",
};


const Home = (props) => {
    const tabs = ["Mới nhất", "Quan tâm", "Xu hướng"];
    const [currentFilter, setCurrentFilter] = useState("Mới nhất");

    const [postData, setPostData] = useState({
        title: "",
        content: "",
        attachment: "",
    });

    const { user, dispatch } = useContext(AuthContext);

    console.log('user',user)
    const [url, setUrl] = useState("");

    const [modal, setModal] = useState(false);
    const [postLoading, setPostLoading] = useState(false);

    const [posts, setPosts] = useState([])

    useEffect(() => {
        fetchPosts().then(res => {
            setPosts(res.data)
        })
    }, [])

    const toggle = () => setModal(!modal);

    const onChange = (e) => {
        const { value, name } = e.target;
        setPostData((prev) => ({ ...prev, [name]: value }));

    };

    const post = async () => {
        setPostLoading(true);
        if(user===null)
        return alert('Ban Phai Can Dang Nhap')
        createPost({
            title: postData.title,
            content: postData.content,
            img: url,
            authorId: user._id,
        })
            .then((res) => {
                console.log(res, "post res");
                setPostLoading(false);
                toggle();
                fetchPosts().then(res => {
                    setPosts(res.data)
                })

            })
            .catch((err) => {
                console.log(err, "err");
                setPostLoading(false);
            });
    };

    const upload = async (e) => {
        const formData = new FormData()
        formData.append("file", e.target.files[0])
        const res = await uploadImage(formData)
        setUrl(res.data.url)
        console.log("res.url", res);
    }

    const onLike = (postId) => {
        // Gọi api like để update dữ liệu dưới db
        likePost(postId, user._id)

        // Thay đổi state để render ra giao diện
        const newPosts = posts.map(post => {
            if (post._id == postId) {
                if (post.likeCount.includes(user._id)) {
                    // dislike
                    return {
                        ...post,
                        likeCount: post.likeCount.filter(userId => userId != user._id)
                    }
                }
                // liken
                return {
                    ...post,
                    likeCount: [...post.likeCount, user._id]
                }
            }
            return post
        })

        setPosts(newPosts)
    }

    return (
        <div className="Home">
            <div className="Home-button">
                <div className="Home-button-1">
                    {tabs.map((tab, index) => {
                        return (
                            <Button
                                key={tab}
                                onClick={() => setCurrentFilter(tab)}
                                style={currentFilter === tab ? active : {}}
                            >
                                {tab}
                            </Button>
                        );
                    })}
                </div>
                <div className="Home-button-2">
                    <Button onClick={toggle} color="primary" variant="contained">
                        Viết bài <CreateIcon />
                    </Button>
                    {/*Modal: Hiện pop-up để đăng bài */}

                    <Modal isOpen={modal} toggle={toggle} >
                        <ModalHeader toggle={toggle}>Add a post ✍️</ModalHeader>
                        <ModalBody>

                            <Input
                                style={{ marginBottom: '0.5rem' }}
                                name="title"
                                type="text"
                                placeholder="title"
                                onChange={onChange}
                                value={postData.title}
                            />
                            <Input
                                style={{ marginBottom: '0.5rem' }}
                                name="content"
                                type="textarea"
                                placeholder="content"
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
                            <LoadingButton
                                loading={postLoading}
                                color="primary"
                                onClick={post}
                            >
                                POST IT
                            </LoadingButton>
                            <Button variant="danger" onClick={toggle}>
                                Cancel
                            </Button>
                        </ModalFooter>

                    </Modal>
                </div>
            </div>

            <hr />
            {/* <div className='Home-image'>
                <img src='https://media2.giphy.com/media/3o8dp7vEroP9E0WSdi/giphy.gif?cid=ecf05e47dbb6nseunuf7fn2b3082vrj038uf6qvznga4k8oj&rid=giphy.gif&ct=g'
                />

            </div> */}
            <div className="Home-posts">
                {/* <PostList posts={posts}/> */}
                <Row>
                    {posts.map((post) => (
                        <Col key={post._id} >
                            <Post post={post} onLike={onLike} />
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    );
};

export default Home;

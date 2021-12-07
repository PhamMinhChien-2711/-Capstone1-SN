import React, { useState, useContext, useRef, } from "react";
import { AuthContext } from "../../context/AuthContext";
import {
    Button,
} from "@material-ui/core";

import { LoadingButton } from "@mui/lab";
import CreateIcon from "@mui/icons-material/Create";
import "./index.scss";
import PostList from "../../components/PostList";
import Item from "../../components/Item/HomeItem";
import { createPost, fetchPosts } from "../../api/post";
import { uploadImage } from "../../api/upload";
import {
    Container,
    Row,
    Input,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from "reactstrap";
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
    const [file, setFile] = useState(null);
    const [url, setUrl] = useState("");
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const desc = useRef();
    const [modal, setModal] = useState(false);
    const [postLoading, setPostLoading] = useState(false);

    const toggle = () => setModal(!modal);

    const onChange = (e) => {
        const { value, name } = e.target;
        setPostData((prev) => ({ ...prev, [name]: value }));

    };

    const post = async () => {
        setPostLoading(true);
        createPost({
            title: postData.title,
            content: postData.content,
            img: url,
        })
            .then((res) => {
                console.log(res, "post res");
                setPostLoading(false);
            })
            .catch((err) => {
                console.log(err, "err");
                setPostLoading(false);
            });
    };

    const upload = (e) => {
        const formData = new FormData()
        formData.append("file", e.target.files[0])

        const res = await uploadImage(formData)

        setUrl(res.url)
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
            <img src={url} alt="" />
            <hr />
            <div className="Home-posts">
                <Container>
                    <Row >
                        <PostList />
                    </Row>
                </Container>
            </div>
        </div>
    );
};

export default Home;

import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import "./AddItem.scss";
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext";
import { FastField, Form, Formik } from "formik";
import InputField from "../../CustomField/InputField";
import { Button, Input } from "reactstrap";
import { toast } from "react-toastify";
import { TextField } from "@mui/material";

export default function NewPostSupport() {
  const [data, setData] = useState({
    title: "",
    content: "",
    postImage: null,
  });
  const { user, dispatch } = useContext(AuthContext);

  const [postLoading, setPostLoading] = useState(false);

  const onChangeData = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
    if (event.target.name === "postImage")
      setData({ ...data, postImage: event.target.files[0] });
  };
  const history = useHistory();
  const onSubmit = async (event) => {
    try {
      setPostLoading(true);
      if (user === null) return alert("Ban Phai Can Dang Nhap");
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("content", data.content);
      formData.append("postImage", data.postImage);
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_API}/support/newSupport`,
        formData
      );
    } catch (error) {
      console.log("ERR of Relief post", error);
    }
  };
  const onChangeMessage = () => {
    toast.success("Đã thêm thành công");
    history.push("/cuutro");
  };
  return (
    <div>
      {"admin" === "admin" ? (
        <div>
          <div id='root'>
            <div className='add'>
              <form onSubmit={onSubmit} className='margin-top-0 form-custom'>
                <div className='Title-item'>
                  <h4>Post Relief</h4>
                </div>

                {/* <div className='add-input'>
                  <TextField
                    fullWidth
                    name='title'
                    label='Title'
                    value={data.title}
                    onChange={onChangeData}
                  />
                </div> */}
                <div className='add-input'>
                  <TextField
                    fullWidth
                    name='content'
                    placeholder='Bạn đang gặp vấn đề gì vậy...?'
                    label='Bạn đang gặp vấn đề gì vậy...?'
                    value={data.content}
                    onChange={onChangeData}
                  />
                </div>

                <div className='add-input'>
                  <input
                    type='file'
                    name='postImage'
                    onChange={onChangeData}
                    accept='image/png, image/gif, image/jpeg'
                  />
                </div>
                <div className='add-button'>
                  <Button type='submit' onClick={onChangeMessage}>
                    POST IT
                  </Button>
                </div>
              </form>
            </div>
          </div>
          <div className='swal-overlay' tabIndex={-1}>
            <div className='swal-modal' role='dialog' aria-modal='true'>
              <div className='swal-icon swal-icon--success'>
                <span className='swal-icon--success__line swal-icon--success__line--long' />
                <span className='swal-icon--success__line swal-icon--success__line--tip' />
                <div className='swal-icon--success__ring' />
                <div className='swal-icon--success__hide-corners' />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div classNameName='not-view'>
          <p>Bạn ko có quyền xem trang này</p>
        </div>
      )}
    </div>
  );
}

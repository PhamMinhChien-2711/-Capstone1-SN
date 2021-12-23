import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Col } from "reactstrap";
import "./index.scss";
import moment from "moment";

function CuuTroItem(props) {
  const { post, classname } = props;

  return (
    <div className='CT-item'>
      {/* <label className='Author' style={{ width: "600px" }}>
        {post.name}
      </label>
      <span
        className='CreatedAt'
        style={{ width: "300px", display: "flex", marginLeft: "-3px" }}
      >
        {" "}
        {moment(post.createdAt).format("MMMM Do YYYY, h:mm")}
      </span>
      <br />
      <h6 className='Title' style={{ width: "1000px", display: "flex" }}>
        {post.title}
      </h6>
      <Link
        className='Item-link'
        to={{ pathname: `/cuutro/${post._id}`, state: { post } }}
        style={{ textDecoration: "underline", fontStyle: "italic" }}
      >
        Detail
      </Link> */}

      <Link className='CT-item' to={{ pathname: `/cuutro/${post._id}`, state: { post } }}>
        <div className='CT-item-dot'></div>
        <span className='CT-item-content'>{post.content}</span>
        <div className='CT-item-image'>
          <img src={ post.postImage || "/assets/post/1.jpeg" } />
        </div>
      </Link>
    </div>
  );
}

export default CuuTroItem;

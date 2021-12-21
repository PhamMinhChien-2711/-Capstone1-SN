import React from "react";
import { Link } from "react-router-dom";
import { Col } from "reactstrap";
import "./index.scss";
import { getTimeDistanceFromNow } from "../../../utils/formater";
import { Avatar } from "@material-ui/core";

function HoiDapItem(props) {
  const { post, classname } = props;

  return (
    <div className='HDI'>
      <div className='HDI-left'>
        <img
          style={{ width: "30px", heigh: "40px" }}
          src='/assets/date.svg'
          alt='date created of post'
        />
        <span className='HDI-left__date'>
          Khoảng {getTimeDistanceFromNow(post.createdAt)}
        </span>
      </div>
      <div className='HDI-right'>
        <div className='HDI-right__userInfor'>
          <Avatar
            className='HDI-right__userInfor-avatar'
            s
            src={post?.authorInfo?.profilePicture}
            alt=''
          />
          <div style={{ paddingTop: "13px" }}>
            <Link
              to={`/user?userId=${post?.authorId}`}
              style={{ textDecoration: "none" }}
            >
              <label className='HDI-right__userInfor-name' style={{ paddingLeft: 10 }}>
                {post?.authorInfo?.username}
              </label>
            </Link>
            <div className='HDI-right__content'>
              <p className='HDI-right__content-title'>{post.content}</p>
            </div>
          </div>
        </div>
      </div>
      <div className='HDI-button'>
        <Link
          className='Item-link'
          to={{ pathname: `/hoidap/postid=${post._id}`, state: { post } }}
        >
          <img className='HDI-button__svg' src='/assets/right-arrow.svg' />
        </Link>
      </div>
    </div>
  );
}

export default HoiDapItem;

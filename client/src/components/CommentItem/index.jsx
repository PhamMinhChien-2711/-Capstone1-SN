import { Avatar } from "@mui/material";
import './style.scss';

export default function CommentItem(props) {
    const { item } = props;


    return <div className='comment-item'>
        <div className='comment-item-infor'>
            <Avatar
                className="comment-item-infor__avatar"
                src={
                    item?.authorInfo?.profilePicture
                        ? item?.authorInfo?.profilePicture
                        : "person/noAvatar.png"
                }
                alt=""
            />
            <span className='comment-item-infor__username'>  {item?.authorInfo?.username ? item?.authorInfo?.username : 'Hacker vip pro'}  </span>
        </div>

        <div className='comment-item-content' >{item?.content} </div>
        {/* <button className='comment-item-delete' >delete </button> */}
    </div>
}

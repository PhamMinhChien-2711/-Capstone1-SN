import "./message.css"
import {format} from "timeago.js"

export default function Message({ message, own }) {
    return (
        <div className={own ? "message own" : "message"}>
            <div className="messageTop">
                <img className="messageImg" src="https://9mobi.vn/cf/images/2015/03/nkk/hinh-anh-dep-1.jpg" alt="" />
                <p className="messageText">{message.text}</p>
            </div>
            <div className="messageBottom">{format(message.createdAt)}</div>
        </div>
    )
}

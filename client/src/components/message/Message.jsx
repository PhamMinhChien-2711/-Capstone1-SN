import "./message.css"
import {format} from "timeago.js"
import { useContext} from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Message({ message, own }) {
    const { user } = useContext(AuthContext);
    return (
        <div className={own ? "message own" : "message"}>
            <div className="messageTop">
                <img className="messageImg" src={user.profilePicture} alt="" />
                <p className="messageText">{message.text}</p>
            </div>
            <div className="messageBottom">{format(message.createdAt)}</div>
        </div>
    )
}

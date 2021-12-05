import React, { } from 'react';
import './index.css';

function WritePost(props) {
    return (
        <div className="writePost">
            <form className="writeForm">
                <div className="writeFormGroup">
                    <input type="text" placeholder="Title" className="writeInput" autoFocus={true} />
                </div>
                <div className="writeFormGroup">
                    <textarea type="text" placeholder="Tell your story..." className="writeInput writeText" rows="13" ></textarea>
                    <label htmlFor="fileInput">
                        <i class="fas fa-camera-retro"></i>
                    </label>
                    <input type="file" id="fileInput" style={{ display: "none" }} />
                </div>
                <div className="writeFormGroup">
                    <img className="writeImg" />
                </div>
                <div className="writeFormGroup">
                    <button className="writeSubmit">Đăng bài viết</button>
                </div>
            </form>
        </div>
    );
}
export default WritePost;
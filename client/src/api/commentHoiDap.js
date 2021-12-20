import apiBase from "."

const commentApi = {}


commentApi.getComment = (postId) => {
    return apiBase.get(`${process.env.REACT_APP_BASE_API}/commentHoiDap/${postId}`)
}
commentApi.postComment = (comment) => {
    return apiBase.post(`${process.env.REACT_APP_BASE_API}/commentHoiDap`,comment )
}

export default commentApi
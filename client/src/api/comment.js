import apiBase from "."

const commentApi = {}


commentApi.getComment = () => {
    return apiBase.get(`${process.env.REACT_APP_BASE_API}/`)
}
commentApi.postComment = ( ) => {
    return apiBase.post(`${process.env.REACT_APP_BASE_API}/` )
}

export default commentApi
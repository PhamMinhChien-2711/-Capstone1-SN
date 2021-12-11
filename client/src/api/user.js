import apiBase from "."

const userApi = {}

// userApi.login = (payload) => {
//     return apiBase.post(`${process.env.REACT_APP_BASE_API}/user/login`, payload)
// }

// userApi.register = (payload) => {
//     return apiBase.post(`${process.env.REACT_APP_BASE_API}/user/register`, payload)
// }
userApi.getUser = (userId) => {
    return apiBase.get(`${process.env.REACT_APP_BASE_API}/users?userId=${userId}`)
}
userApi.updateUser = (userId, userInfor) => {
    return apiBase.put(`${process.env.REACT_APP_BASE_API}/user/${userId}`, userInfor)
}

export default userApi
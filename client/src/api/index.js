import axios from 'axios'

const apiBase = axios.create()

apiBase.interceptors.request.use(config => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo')) 
    console.log(userInfo, 'userInfo');

    if (userInfo?.token) {
        config.headers.Authorization = `Bearer ${userInfo?.token}`
    }
    return config
})

export default apiBase
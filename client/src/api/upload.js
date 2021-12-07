import apiBase from '.';

export const uploadImage = async (formData) => {
    return apiBase.post(`${process.env.REACT_APP_BASE_API}/upload`,formData)
}
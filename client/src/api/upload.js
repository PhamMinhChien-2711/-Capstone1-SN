import apiBase from '.';

export const uploadImage = async (formData) => {
    return apiBase.post("/api/upload")
}
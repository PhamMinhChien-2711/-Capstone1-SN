import axios from 'axios';
import apiBase from '.';


export const fetchPosts = async () => await axios.get(`/postsHoiDap`);

export const createPost = (payload) => {
   return apiBase.post(`/postsHoiDap`, payload)

};
export const updatePost = (postId,payload) => {
   return apiBase.put(`/postsHoiDap/${postId}`,payload)

};
export const likePost = (postId, userId) => {
   return apiBase.put(`/postsHoiDap/${postId}/like`, { userId })
};

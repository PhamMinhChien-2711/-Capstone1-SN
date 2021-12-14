import axios from 'axios';
import apiBase from '.';


export const fetchPosts = async () => await axios.get(`/posts`);

export const createPost = (payload) => {
   return apiBase.post(`/posts`, payload)

};
export const updatePost = (postId,payload) => {
   return apiBase.put(`/posts/${postId}`,payload)

};
export const likePost = (postId, userId) => {
   return apiBase.put(`/posts/${postId}/like`, { userId })
};

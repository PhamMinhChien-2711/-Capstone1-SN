import axios from 'axios';
import apiBase from '.';


export const fetchPosts = async () => await axios.get(`/posts`);

export const createPost = (payload) => {
   return apiBase.post(`/posts`, payload)
   
};
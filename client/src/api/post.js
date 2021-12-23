import axios from "axios";
import apiBase from ".";

export const fetchPosts = async () =>
  await axios.get(`${process.env.REACT_APP_BASE_API}/posts`);

export const createPost = (payload) => {
  return apiBase.post(`${process.env.REACT_APP_BASE_API}/posts`, payload);
};
export const updatePost = (postId, payload) => {
  return apiBase.put(`${process.env.REACT_APP_BASE_API}/posts/${postId}`, payload);
};
export const likePost = (postId, userId) => {
  return apiBase.put(`${process.env.REACT_APP_BASE_API}/posts/${postId}/like`, {
    userId,
  });
};

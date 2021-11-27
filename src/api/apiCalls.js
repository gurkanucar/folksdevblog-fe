import axios from "axios";

//  /api/v1/blogPost/post/1

export const getAllPosts = () => {
  return axios.get("/api/v1/blogPost/posts");
};

export const getPostById = (id) => {
  return axios.get("/api/v1/blogPost/post/" + id);
};



export const getUsers = (page = 0, size = 5) => {
  return axios.get(`/api/user?page=${page}&size=${size}`);
};

export const getUser = (username) => {
  return axios.get(`/api/user/${username}`);
};

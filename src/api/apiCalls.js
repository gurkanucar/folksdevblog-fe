import axios from "axios";
import { API_BASE_URL } from "../constants";

//  /api/v1/blogPost/post/1

export const getAllPosts = () => {
  return axios.get(API_BASE_URL + "/api/v1/blogPost/posts");
};

export const getPostById = (id) => {
  return axios.get(API_BASE_URL + "/api/v1/blogPost/post/" + id);
};

export const createPost = (post) => {
  return axios.post(API_BASE_URL + "/api/v1/blogPost/post", post);
};

export const updatePost = (id, post) => {
  return axios.put(API_BASE_URL + "/api/v1/blogPost/post/" + id, post);
};

export const deletePostById = (id) => {
  return axios.delete(API_BASE_URL + "/api/v1/blogPost/post/" + id);
};

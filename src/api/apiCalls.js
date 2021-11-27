import axios from "axios";

//  /api/v1/blogPost/post/1

export const getAllPosts = () => {
  return axios.get("/api/v1/blogPost/posts");
};

export const getPostById = (id) => {
  return axios.get("/api/v1/blogPost/post/" + id);
};

export const createPost = (post) => {
  return axios.post("/api/v1/blogPost/post", post);
};

export const updatePost = (id, post) => {
  return axios.put("/api/v1/blogPost/post/" + id, post);
};

export const deletePostById = (id) => {
  return axios.delete("/api/v1/blogPost/post/" + id);
};

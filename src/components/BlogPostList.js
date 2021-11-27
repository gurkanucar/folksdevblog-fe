import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import BlogPostCard from "./BlogPostCard";
import { getAllPosts } from "../api/apiCalls";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "20vh",
  },
  flexItems: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    height: "400px",
    alignContent: "space-between",
  },
}));

export default function BlogPostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    loadAllPosts();
  }, []);

  const loadAllPosts = async (page) => {
    try {
      const response = await getAllPosts(page);
      setPosts(response.data);
    } catch (error) {}
  };

  const classes = useStyles();
  return (
    <div className={classes.root} id="post-list">
      <div className={classes.flexItems}>
        {posts?.map((post, index) => (
          <Link
            to={`/show/${post.id}`}
            style={{ color: 'inherit', textDecoration: 'inherit'}}
          >
            <div className="col-md-4 mt-3 mb-3">
              <BlogPostCard key={post?.id} post={post} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

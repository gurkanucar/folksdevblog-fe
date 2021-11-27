import React from "react";
import BlogPostList from "../components/BlogPostList";
import CollapseTextComponent from "../components/CollapseTextComponent";

function HomePage() {
  return (
    <div>
      <CollapseTextComponent />
      <BlogPostList />
    </div>
  );
}

export default HomePage;

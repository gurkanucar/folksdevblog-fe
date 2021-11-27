import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  div: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    color: "white",
    fontFamily: "Nunito",
    fontWeight: "bold",
    fontSize: "5rem",
  },
}));

function NotFoundPage() {
  const classes = useStyles();

  return (
    <div className={classes.div}>
      <Link to={`/`} style={{ color: "inherit", textDecoration: "inherit" }}>
        <h1 className={classes.title}>Not Found!</h1>
        <h3 className={classes.title}>redirect to Home Page</h3>
      </Link>
    </div>
  );
}

export default NotFoundPage;

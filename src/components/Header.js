import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, CardMedia, IconButton, Toolbar } from "@material-ui/core";
import MenuComponent from "./MenuComponent";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  appbar: {
    background: "rgba(33,37,41,0.9)",
  },

  icon: {
    color: "#fff",
    fontSize: "3rem",
  },
  expandIcon: {
    color: "#fff",
    fontSize: "4rem",
  },
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "20vh",
  },
  appbarWrapper: {
    width: "80%",
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  appbarTitle: {
    fontFamily: "nunito",
    display: "flex",
    justifyContent: "space-between",
  },
  media: {
    height: "80px",
    width: "80px",
    marginTop: "1px",
  },
  container: {
    textAlign: "center",
  },
  title: {
    color: "#fff",
    fontFamily: "nunito",
    fontSize: "3rem",
    textAlign: "center",
  },
  pointer: {
    cursor: "pointer",
  },
}));

export default function Header() {
  const classes = useStyles();

  return (
    <div className={classes.root} id="header">
      <AppBar className={classes.appbar} elevation={0}>
        <Toolbar className={classes.appbarWrapper}>
          <Link
            style={{ color: "inherit", textDecoration: "inherit" }}
            to={`/`}
          >
            <div className={classes.appbarTitle}>
              <CardMedia
                className={classes.media}
                component="img"
                image={
                  process.env.PUBLIC_URL + "/assets/folksdev-logo-white.png"
                }
                //{process.env.PUBLIC_URL + "/assets/bg2.jpg"}
                alt=""
              />
              <h1 className={classes.pointer}>FolksDEV</h1>
            </div>
          </Link>
          <IconButton>
            <MenuComponent />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}

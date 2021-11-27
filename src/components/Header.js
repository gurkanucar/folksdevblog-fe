import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Collapse,
  CssBaseline,
  IconButton,
  Toolbar,
} from "@material-ui/core";
import SortIcon from "@material-ui/icons/Sort";
import DownIcon from "@material-ui/icons/ExpandMore";
import { Link as Scroll } from "react-scroll";
import { Sling as Hamburger } from "hamburger-react";
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

  const [isOpen, setOpen] = useState(false);

  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(true);
  }, []);

  return (
    <div className={classes.root} id="header">
      <AppBar className={classes.appbar} elevation={0}>
        <Toolbar className={classes.appbarWrapper}>
          <div className={classes.appbarTitle}>
            <h1 className={classes.pointer}>
              <Link
                style={{ color: 'inherit', textDecoration: 'inherit'}}
                to={`/`}
              >
                FolksDEV
              </Link>
            </h1>
          </div>
          <IconButton>
            <MenuComponent />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* <Collapse in={checked} {...(checked ? { timeout: 1600 } : {})}>
        <div className={classes.container}>
          <h1 className={classes.title}>
            Welcome to <br /> FolksDEV Society
          </h1>
          <Scroll to="post-list" smooth={true}>
            <IconButton>
              <DownIcon className={classes.expandIcon} />
            </IconButton>
          </Scroll>
        </div>
      </Collapse> */}
    </div>
  );
}

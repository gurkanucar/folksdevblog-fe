import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Collapse, IconButton } from "@material-ui/core";
import DownIcon from "@material-ui/icons/ExpandMore";
import { Link as Scroll } from "react-scroll";

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
    marginTop: "10vh",
  },
  appbarWrapper: {
    width: "80%",
    margin: "0 auto",
  },
  appbarTitle: {
    flexGrow: "1",
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
}));

export default function CollapseTextComponent() {
  const classes = useStyles();

  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(true);
  }, []);

  return (
    <div className={classes.root} id="header">
      <Collapse in={checked} {...(checked ? { timeout: 1600 } : {})}>
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
      </Collapse>
    </div>
  );
}

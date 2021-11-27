import React, { useState, useEffect } from "react";
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import Create from "@material-ui/icons/Create";
import Settings from "@material-ui/icons/Settings";
import ListIcon from "@material-ui/icons/List";

import { Sling as Hamburger } from "hamburger-react";

const MenuComponent = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  // const navigate = useNavigate();

  // const handleOnSubmit = (url) => {
  //   navigate(`/${url}`, { replace: true });
  // };

  const [isOpen, setOpen] = useState(false);
  return (
    <React.Fragment>
      <Box
        onClick={handleClick}
        sx={{ display: "flex", alignItems: "center", textAlign: "center" }}
      >
        <Tooltip title="Settings">
          <Hamburger toggled={isOpen} toggle={setOpen} color="#fff" />
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        style={{ marginTop: 50 }}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={() => console.log("")}>
          <ListItemIcon>
            <Create fontSize="small" />
          </ListItemIcon>
          Create New
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <ListIcon fontSize="small" />
          </ListItemIcon>
          Edit Posts
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
};
export default MenuComponent;

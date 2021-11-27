import React, { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { Button, Typography } from "@material-ui/core";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import { createPost } from "../api/apiCalls";
import { useHistory } from "react-router-dom";
import Modal from "@mui/material/Modal";



const CreatePage = (props) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const [errorMessage, setErrorMessage] = useState();

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "red",
    borderRadius: 5,
    boxShadow: 24,
    p: 4,
  };

  const [values, setValues] = React.useState({
    name: "",
    imageUrl: "",
    videoUrl: "",
    details: "",
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const history = useHistory();

  const redirectToHomePage = () => {
    history.push("/");
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const create = async () => {
    try {
      const detailsData = draftToHtml(
        convertToRaw(editorState.getCurrentContent())
      );
      let temp = values;
      temp.details = detailsData;
      await setValues(temp);
      await createPost(values)
        .then(() => {
          redirectToHomePage();
        })
        .catch((err) => {
          setErrorMessage(
            err.message + "\n" + JSON.stringify(err.response.data)
          );
          handleOpen();
        });
    } catch (err) {}
  };

  return (
    <div
      className="rounded"
      style={{
        marginLeft: 30,
        marginRight: 30,
      }}
    >
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            style={{ color: "white" }}
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            HATA!
          </Typography>
          <Typography
            style={{ color: "white" }}
            id="modal-modal-description"
            sx={{ mt: 2 }}
          >
            {errorMessage}
          </Typography>
        </Box>
      </Modal>
      <div
        style={{
          marginBottom: 20,
          borderRadius: 25,
          padding: 20,
          background: "#ffffff",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel htmlFor="name">Post Ismi</InputLabel>
              <OutlinedInput
                id="name"
                value={values.name}
                onChange={handleChange("name")}
                label="Post Ismi"
              />
            </FormControl>
          </Grid>
          <Grid item xs={8}>
            <FormControl fullWidth>
              <InputLabel htmlFor="imageUrl">Resim Url</InputLabel>
              <OutlinedInput
                id="imageUrl"
                value={values.imageUrl}
                onChange={handleChange("imageUrl")}
                label="Resim Url"
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel htmlFor="videoUrl">Video Url</InputLabel>
              <OutlinedInput
                id="videoUrl"
                value={values.videoUrl}
                onChange={handleChange("videoUrl")}
                label="Video Url"
              />
            </FormControl>
          </Grid>
        </Grid>
      </div>

      <Editor
        editorStyle={{
          height: "30rem",
          backgroundColor: "white",
          marginBottom: 20,
          padding: "20px",
        }}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        editorState={editorState}
        onEditorStateChange={(e) => {
          setEditorState(e);
        }}
      />
      <Button
        variant="contained"
        color="primary"
        style={{
          marginBottom: 20,
        }}
        onClick={async () => {
          await create();
          console.log(values);
        }}
      >
        Yolla
      </Button>
    </div>
  );
};

export default CreatePage;

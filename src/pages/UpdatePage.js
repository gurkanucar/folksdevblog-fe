import React, { useState, useEffect } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import { Button, Typography } from "@material-ui/core";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import { deletePostById, getPostById, updatePost } from "../api/apiCalls";
import { useHistory } from "react-router-dom";
import Modal from "@mui/material/Modal";

const UpdatePage = (props) => {
  const history = useHistory();

  const paramID = props.match.params.id;

  const [editorState, setEditorState] = useState();
  const [errorMessage, setErrorMessage] = useState();

  //state for modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //redirect after update
  const redirectToHomePage = () => {
    history.push("/");
  };

  //redirect 404 not found page
  const redirectTo404Page = () => {
    history.push("/404");
  };

  const [values, setValues] = useState({
    name: "",
    imageUrl: "",
    videoUrl: "",
    details: "",
  });

  //modal style
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

  //input change func
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const askForDelete = () => {
    if (window.confirm("Silmek istediginize emin misiniz?")) {
      deletePost();
      console.log("silindi");
    } else {
      // Do nothing!
      console.log("iptal edildi");
    }
  };

  //load posts when opened
  useEffect(() => {
    loadPost();
  }, []);

  const loadPost = async () => {
    try {
      const response = await getPostById(paramID);
      setValues(response.data);
      setEditorState(
        EditorState.createWithContent(
          ContentState.createFromBlockArray(
            htmlToDraft(response.data.details).contentBlocks
          )
        )
      );
    } catch (error) {
      redirectTo404Page();
    }
  };

  const update = async () => {
    try {
      const detailsData = draftToHtml(
        convertToRaw(editorState.getCurrentContent())
      );
      let temp = values;
      temp.details = detailsData;
      await setValues(temp);
      await updatePost(paramID, values)
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

  const deletePost = async () => {
    try {
      await deletePostById(paramID)
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
          // display: "flex",
          // justifyContent: "space-around",
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
                defaultValue={values.name}
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
                defaultValue={values.imageUrl}
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
                defaultValue={values.videoUrl}
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
        onEditorStateChange={(e) => setEditorState(e)}
      />
      <Button
        variant="contained"
        color="primary"
        style={{
          marginBottom: 20,
        }}
        onClick={() => update()}
      >
        Kaydet
      </Button>
      <Button
        variant="contained"
        color="secondary"
        style={{
          marginBottom: 20,
          marginLeft: 20,
        }}
        onClick={() => askForDelete()}
      >
        Sil
      </Button>
    </div>
  );
};

export default UpdatePage;

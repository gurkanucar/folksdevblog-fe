import React, { useState, useEffect } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, ContentState } from "draft-js";
import htmlToDraft from "html-to-draftjs";
import Button from "@material-ui/core/Button";
import { getPostById } from "../api/apiCalls";
import { CardMedia, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@mui/material/CircularProgress";
import YouTube from "react-youtube";
import Grid from "@mui/material/Grid";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 450,
    minWidth: 450,
    height: 520,
    background: "rgba(255,255,255,1)",
    margin: "20px",
  },
  media: {
    height: "50vh",
    width: "90%",
    padding: "1px",
    //marginRight:"25px",
  },
  video: {
    marginBottom: 10,
    height: "50vh",
    width: "90%",
    // marginLeft:"25px",
  },
  grid: {
    marginLeft: "30px",
  },
  title: {
    color: "white",
    fontFamily: "Nunito",
    fontWeight: "bold",
    fontSize: "3rem",
    justifyContent: "start",
    display: "-webkit-box",
    boxOrient: "vertical",
    lineClamp: 2,
    wordBreak: "break-all",
    overflow: "hidden",
  },
}));

const ShowPage = (props) => {
  const history = useHistory();

  const redirectToUpdatePage = () => {
    history.push("/update/" + paramID);
  };

  //redirect 404 not found page
  const redirectTo404Page = () => {
    history.push("/404");
  };

  const classes = useStyles();
  const paramID = props.match.params.id;

  const [editorState, setEditorState] = useState(undefined);
  const [post, setPost] = useState([]);

  useEffect(() => {
    loadPost();
  }, []);

  const updateYoutubeUrl = (data) => {
    const temp = data;
    temp.videoUrl = data.videoUrl.split("watch?v=")[1];
    setPost(temp);
    return temp;
  };

  const loadPost = async () => {
    try {
      const response = await getPostById(paramID);
      const detailsData = htmlToDraft(response.data.details);
      await updateYoutubeUrl(response.data);
      console.log(post);
      setEditorState(
        EditorState.createWithContent(
          ContentState.createFromBlockArray(detailsData.contentBlocks)
        )
      );
    } catch (error) {
      redirectTo404Page();
    }
  };
  const opts = {
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const _onReady = (event) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  };

  return (
    <div
      style={{
        marginLeft: 50,
        marginRight: 50,
      }}
    >
      {post && post ? (
        <div>
          <Grid container className={classes.grid}>
            <Grid item xs={6}>
              <CardMedia
                className={classes.media}
                component="img"
                image={
                  post.imageUrl && post.imageUrl
                    ? post.imageUrl
                    : process.env.PUBLIC_URL + "/assets/folksdevlogo.png"
                }
                //{process.env.PUBLIC_URL + "/assets/bg2.jpg"}
                alt="green iguana"
              />
            </Grid>
            <Grid item xs={6}>
              <YouTube
                className={classes.video}
                videoId={post.videoUrl}
                opts={opts}
                onReady={_onReady}
              />
            </Grid>
          </Grid>

          <Typography gutterBottom component="div" className={classes.title}>
            {post.name}
          </Typography>
          <Editor
            editorStyle={{
              backgroundColor: "white",
              padding: "20px",
              marginBottom: 20,
              borderRadius: 10,
            }}
            editorState={editorState}
            wrapperClassName="demo-wrapper"
            editorClassName="demo-editor"
            toolbarHidden
            readOnly={true}
          />
          <Button
            variant="outlined"
            color="primary"
            style={{
              marginBottom: 20,
            }}
            onClick={() => {
              console.log("Parametre id: " + paramID);
              redirectToUpdatePage();
              //console.log(htmlToDraft(getContent()));
            }}
          >
            EDIT
          </Button>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "70vh",
          }}
        >
          <CircularProgress size={100} />
        </div>
      )}
    </div>
  );
};

export default ShowPage;

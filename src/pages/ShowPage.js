import React, { useState, useEffect } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import Button from "@material-ui/core/Button";
import { useParams } from "react-router-dom";
import { getPostById } from "../api/apiCalls";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import YouTube from "react-youtube";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 450,
    minWidth: 450,
    height: 520,
    background: "rgba(255,255,255,1)",
    margin: "20px",
  },
  media: {
    height: 300,
  },
  video: {
    margin: "auto",
    display: "flex",
    marginBottom: 30,
    height: '500px',
    width:"45%",
    justifyContent: "center",
  },
  title: {
    color: "white",
    fontFamily: "Nunito",
    fontWeight: "bold",
    fontSize: "3rem",
    display: "flex",
    justifyContent: "start",
  },
}));

const ShowPage = (props) => {
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
    } catch (error) {}
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
      className="rounded"
      style={{
        marginLeft: 50,
        marginRight: 50,
      }}
    >
      <div>
        <YouTube
          className={classes.video}
          videoId={post.videoUrl}
          opts={opts}
          onReady={_onReady}
        />
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
          variant="contained"
          color="secondary"
          style={{
            marginBottom: 20,
          }}
          onClick={() => {
            console.log("Parametre id: " + paramID);
            //console.log(htmlToDraft(getContent()));
          }}
        >
          Yolla
        </Button>
      </div>
    </div>
  );
};

export default ShowPage;

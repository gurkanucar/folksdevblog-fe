import React, { useState, useEffect } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import Button from "@material-ui/core/Button";

const CreatePage = (props) => {
  const contentBlock = htmlToDraft(props?.location?.state?.content);

  const contentState = ContentState.createFromBlockArray(
    contentBlock.contentBlocks
  );

  const checkIsEditable = () => {
    return props?.location?.state?.isEditable;
  };

  const idFromParam = props?.match?.params?.id;

  const checkContent = () => {
    const content = props?.location?.state?.content;

    if (content === null || content === undefined || content === "") {
      return false;
    }

    return true;
  };


  const getContent = () => {
    return props?.location?.state?.content;
  };

  const [editorState, setEditorState] = useState(null);


  //   EditorState.createWithContent(contentState);
  //   EditorState.createEmpty();

  useEffect(() => {
    const idFromParams = props?.match?.params?.id;
    console.log("Parametre id: " + idFromParams);
    EditorState.createEmpty()
  }, []);

  return (
    <div
      className="rounded"
      style={{
        marginLeft: 50,
        marginRight: 50,
      }}
    >
      {
        <div>
          <Editor
            editorStyle={{
              height: "25rem",
              backgroundColor: "white",
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
            onClick={() => {
              console.log(
                draftToHtml(convertToRaw(editorState.getCurrentContent()))
              );
            }}
          >
            Yolla
          </Button>
        </div>
      }
    </div>
  );
};

export default CreatePage;

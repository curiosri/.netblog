import { createTheme, ThemeProvider, Typography } from "@mui/material";
import { ContentBlock, ContentState, convertFromHTML, convertToRaw, EditorState} from "draft-js";
import draftToHtml from "draftjs-to-html";
import React, { useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

    const TextEditor = ({ onChange, value } : any) => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [updated, setUpdated] = useState(false);

    
    useEffect(() => {
      if (!updated) {
        const defaultValue = value ? value : "";
        const blocksFromHtml = convertFromHTML(defaultValue);
        const contentState = ContentState.createFromBlockArray(
          blocksFromHtml.contentBlocks,
          blocksFromHtml.entityMap
        );
        const newEditorState = EditorState.createWithContent(contentState);
        setEditorState(newEditorState);
      }
    }, [value]);

    
    
  
    const onEditorStateChange = (editorState : any) => {
      setUpdated(true);
      setEditorState(editorState);
      return onChange(draftToHtml(convertToRaw(editorState.getCurrentContent()))); 

    };
  
    const toolbar = {
      options: ["inline", "blockType", "list", "image"],
      inline: {
        inDropdown: false,
        options: ['bold', 'underline', 'italic']
      },
      
      blockType: {
        inDropdown: false,
        options: ["H1", "H2", "H3", "H5", "Normal", "Code"]
      },

      list: {
        inDropdown: false,
        options: ["unordered", "ordered"]
      },
      image: {
        className: undefined,
        component: undefined,
        popupClassName: undefined,
        urlEnabled: true,
        uploadEnabled: true,
        alignmentEnabled: true,
        uploadCallback: undefined,
        previewImage: false,
        inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
        alt: { present: false, mandatory: false },
        defaultSize: {
          height: 'auto',
          width: 'auto',
        },
      },
    };    
    
    
    const texttheme = createTheme({
      typography: {
        allVariants: {
          fontFamily: 'Noto Sans KR',
          textTransform: 'none',
        },
      },});
    
    return (
      
      <React.Fragment>
        <div className="editor" style={{maxHeight: "570px" , width:'100%' }}>
        <ThemeProvider theme={texttheme}>
        <Typography sx={{fontSize: 20}}>
          <Editor         
            spellCheck
            editorState={editorState}
            onEditorStateChange={onEditorStateChange}
            wrapperClassName="wrapper-class"
            editorClassName="editor-class"
            toolbarClassName="toolbar-class"
            toolbar={{
            inline: { inDropdown: true },
            list: { inDropdown: true },
            textAlign: { inDropdown: true },
            link: { inDropdown: true },
            history: { inDropdown: true },
            image: { inDropdown: true },
  }}          
          />
          </Typography>
          </ThemeProvider>
        </div>
        
      </React.Fragment>
    );
  };
  
  export default TextEditor;
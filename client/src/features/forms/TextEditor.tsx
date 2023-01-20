import { createTheme, ThemeProvider, Typography } from "@mui/material";
import { EditorBlock, ContentState, convertFromHTML, convertToRaw, EditorState} from "draft-js";
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
      options: ["inline", "blockType", "list", "image", "embedded"],
      inline: {
        inDropdown: false,
        options: ['bold', 'underline', 'italic']
      },
      
      blockType: {
        inDropdown: true,
        options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6'],
        className: undefined,
        component: undefined,
        dropdownClassName: undefined,
      },

      list: {
        inDropdown: false,
        className: undefined,
        component: undefined,
        dropdownClassName: undefined,
        options: ['unordered', 'ordered'],
        
      },
      image: {
        className: undefined,
        component: undefined,
        popupClassName: undefined,
        urlEnabled: true,
        uploadEnabled: true,
        alignmentEnabled: true,
        uploadCallback: uploadImageCallBack,
        previewImage: false,
        inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
        alt: { present: false, mandatory: false },
        defaultSize: {
          height: 'auto',
          width: 'auto',
        },
      },
      embedded: {
        className: undefined,
        component: undefined,
        popupClassName: undefined,
        embedCallback: undefined,
        defaultSize: {
          height: 'auto',
          width: 'auto',
        },
      },
    };
    
    function uploadImageCallBack(file: any) {
      return new Promise(
        (resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.open('POST', 'https://api.imgur.com/3/image');
          xhr.setRequestHeader('Authorization', 'Client-ID');
          const data = new FormData();
          data.append('image', file);
          xhr.send(data);
          xhr.addEventListener('load', () => {
            const response = JSON.parse(xhr.responseText);
            console.log(response)
            resolve(response);
          });
          //xhr.addEventListener('error', () => {
          //  const error = JSON.parse(xhr.responseText);
          //  console.log(error)
          //  reject(error);
          //});
        }
      );
    }
    
    
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
            toolbar={toolbar}
            editorStyle={{height: "500px" }}   
          />
          </Typography>
          </ThemeProvider>
        </div>
        
      </React.Fragment>
    );
  };
  
  export default TextEditor;
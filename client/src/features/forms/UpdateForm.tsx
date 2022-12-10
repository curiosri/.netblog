import { TextField, Box, Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import { useParams } from "react-router-dom";
import TextEditor from "./TextEditor"
import "draft-js/dist/Draft.css";
import React, { useEffect, useState } from 'react';
import { Post } from "../../app/models/post";
import agent from "../../app/api/agent";
import ReactHtmlParser from 'react-html-parser';


export default function UpdateForm() {
  const { register, handleSubmit, control, reset} = useForm();
  const {id} = useParams<{id: string}>();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    agent.Catalog.details(parseInt(id))
    .then(response => setPost(response))
    .catch(error => console.log(error))
    
  }, [id])

  if (!post) return <h3> </h3> 
  // This handles the case where post is null.

  const defaultSet = {
    title: (post? post.title : "title"),
    text: (post? post.text : "write text here"),
    category: (post? post.category : "expat"),
  };

  const onSubmit = async (data: any) => {
    var datestr = (new Date()).toUTCString();
    const formData = new FormData();
    formData.append("id", id)
    formData.append("title", data.title);
    formData.append("text", data.text);
    formData.append("category", data.category);
    formData.append("timestamp", datestr);
    formData.append("authorId", "1");

    const response = await axios(`https://localhost:7230/api/posts/${id}`, {
      method: "PUT",
      data: formData,
      headers: { "Content-Type": "multipart/form-data", "Accept": "multipart/form-data" },
      transformRequest: (formData) => {
      
        return formData;}
      })
      .then((response) => {
        console.log(response);
        window.location.href = 'http://localhost:7231/' // redirects to the homepage. Does work with http, but NOT with https (why?) 
        
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log("server responded");
        } else if (error.request) {
          console.log("network error");
        } else {
          console.log(error);
        }
      });
  };


    return (
      <>           
<form onSubmit={handleSubmit(onSubmit)}>
  <Box>
 
  <TextField
      id="outlined-uncontrolled"
      label="Post Title"
      sx = {{width: '100%'}}
      defaultValue={defaultSet.title}
      type="text"
      {...register("title")}
    />

  </Box>
  <p/><p/>
  <Box>
  <Controller     
          render={({ field }) => (
            <TextEditor onChange={field.onChange} value={field.value} />
          )}
          control={control}
          defaultValue={defaultSet.text}
          {...register("text")}
        />
  </Box>
  <p/>
  <Box sx = {{width: '90%'}}>
    <FormControl fullWidth sx={{width:'20%' }}>
  <InputLabel id="category-input">Category</InputLabel>
  <Select
    labelId="category-select"
    defaultValue={defaultSet.category}
    id="demo-simple-select"
    label="Category"
    {...register("category")}
  >
    <MenuItem value={"news"}>KOREA NEWS</MenuItem>
    <MenuItem value={"learnkorean"}>LEARNING KOREAN</MenuItem>
    <MenuItem value={"studyabroad"}>STUDY ABROAD</MenuItem>
    <MenuItem value={"expat"}>EXPAT LIFE</MenuItem>
  </Select>
</FormControl>

    <Button variant="contained" type="submit" size="large"  sx={{left: "80%"}}>Submit</Button>
  </Box>
</form>          
    </>
    )
  }

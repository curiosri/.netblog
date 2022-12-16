import { TextField, Box, Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import TextEditor from "./TextEditor"
import "draft-js/dist/Draft.css";
import React from 'react';



export default function PostForm() {
  const { register, handleSubmit, control } = useForm();

  const onSubmit = async (data: any) => {
    var datestr = (new Date()).toUTCString();
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("text", data.text);
    formData.append("category", data.category);
    formData.append("timestamp", datestr);
    formData.append("authorId", "1");
    const response = await axios("https://localhost:7230/api/posts", {
      method: "POST",
      data: formData,
      headers: { "Content-Type": "multipart/form-data", "Accept": "multipart/form-data" },
      transformRequest: (formData) => {
      
        return formData;}
      })
      .then((response) => {
        console.log(response);
        window.location.href = 'http://localhost:7231/' // redirects to the homepage. Does work with http, but NOT with https (why?) 
        // How to redirect to individual posts?
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
          defaultValue = ""
          control={control}
          {...register("text")}
        />
  </Box>
  <p/>
  <Box sx = {{width: '90%'}}>
    <FormControl fullWidth sx={{width:'20%' }}>
  <InputLabel id="category-input">Category</InputLabel>
  <Select
    labelId="category-select"
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



    <Button type="submit" variant="contained" size="large"  sx={{left: "80%"}}>Submit</Button>
  </Box>
</form>         

    </>
    )
  }

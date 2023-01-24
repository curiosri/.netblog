import { TextField, Box, Button } from "@mui/material";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import TextEditor from "./TextEditor"
import "draft-js/dist/Draft.css";
import React from 'react';



export default function CommentForm() {
  const { register, handleSubmit, control } = useForm({
    
  });


  const onSubmit = async (data: any) => {
    var datestr = (new Date()).toUTCString();
    const formData = new FormData();
    formData.append("postId", data.postId);
    formData.append("authorId", "1");
    formData.append("text", data.text);
    formData.append("timestamp", datestr);
    formData.append("upvotes", data.upvotes);
    formData.append("reports", data.reports);

    const response = await axios("https://localhost:7230/api/comments", {
      method: "POST",
      data: formData,
      headers: { "Content-Type": "multipart/form-data", "Accept": "multipart/form-data" },
      transformRequest: (formData) => {
      
        return formData;}}
      )
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
  <Controller     
          render={({ field }) => (
            <TextEditor onChange={field.onChange} value={field.value} />
          )}
          control={control}
          defaultValue=""
          {...register("text")}
        />
  </Box>
</form>          
    </>
    )
  }

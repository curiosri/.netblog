import { TextField, Box, Button } from "@mui/material";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import TextEditor from "./TextEditor"
import "draft-js/dist/Draft.css";



export default function UpdateForm() {
  const { register, handleSubmit, control } = useForm({
    
  });
  

  const onSubmit = async (data: any) => {
    var datestr = (new Date()).toUTCString();
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("text", data.text);
    formData.append("category", data.category);
    formData.append("timestamp", datestr);
    formData.append("authorId", "1");
    const response = await axios("https://localhost:7230/api/posts", {
      method: "PUT",
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
 
  <TextField
      id="outlined-uncontrolled"
      label="Post Title"
      sx = {{width: '100%'}}
      defaultValue=""
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
          defaultValue=""
          {...register("text")}
        />
  </Box>
  <p/>
  <Box sx = {{width: '90%'}}>
    <TextField
      id="outlined-uncontrolled"
      label="Category"
      sx = {{width: '20%'}}
      defaultValue=""
      type="text"
      {...register("category")}
    />
    <Button type="submit" variant="contained" size="large"  sx={{left: "80%"}}>Submit</Button>
  </Box>
</form>          
    </>
    )
  }

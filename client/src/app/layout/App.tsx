import { Box, Container, CssBaseline } from "@mui/material";
import React from "react";
import { useState } from "react";
import { Route } from "react-router-dom";
import PostForm from "../../features/forms/PostForm";
import UpdateForm from "../../features/forms/UpdateForm";
import Catalog from "../../features/catalog/Catalog";
import PostDetails from "../../features/catalog/PostDetails";
import { Post } from "../models/post";
import Header from "./Header";
import DsaPage from "../../features/catalog/DsaPage";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  let dateTime = new Date();
  
  return (
    <>
      <ToastContainer position='bottom-right'/>
      <Header />
      <Box sx={{
          p: 2,
          fontSize: '0.875rem',
          fontWeight: '700',
          position: 'relative',
          top: '30%',
          left: '25%',
          alignContent: 'center',
          width: '65%',
        }}>
      <CssBaseline>
      <Container>
        <Route exact path='/' component={Catalog}/>
        <Route exact path='/posts/:id' component={PostDetails}/> {/* link to individual posts */}
        <Route path='/writepost' component={PostForm}/> 
        <Route path='/news' component={DsaPage}/>
        <Route exact path='/posts/:id/update' component={UpdateForm}/> 
      </Container>
      </CssBaseline>
      </Box>
      
    </>
  );
}

export default App;

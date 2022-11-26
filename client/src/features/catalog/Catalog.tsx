import { Box, createTheme, Paper, ThemeProvider } from "@mui/material";
import axios from "axios";
import React from 'react';
import { useState, useEffect } from "react";
import agent from "../../app/api/agent";
import { Post } from "../../app/models/post";
import PostList from "./PostList";



export default function Catalog() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      agent.Catalog.list().then(posts => setPosts(posts))
  }, [])

    return (
        
        <>
        
          
      
      <PostList posts={posts} />
      
      
        </>
            
            
       
        
    )
}
    
        
        
    

import { Grid } from "@mui/material";
import { Post } from "../../app/models/post";
import PostCard from "./PostCard";
import React from 'react';

interface Props {
    posts: Post[]; //use props : destructure 
}


export default function PostList({posts}: Props) { //specify the type as Props
    return (
        <Grid container spacing={5}>
        {posts.map(post  => (
            <Grid item xs={6} key={post.id}>
          <PostCard key={post.id} post={post} />
          </Grid>
        ))}
        </Grid>
        
    )
}
import { Paper, Typography } from "@mui/material";
import { Post } from "../../app/models/post";
import PostList from "../catalog/PostList";

interface Props {
    posts : Post[];
    addPost: () => void;
}

export default function HomePage({posts, addPost}: Props) {
    return (
        <>
        <Paper sx={{
          
            p: 2,
            fontSize: '0.875rem',
            fontWeight: '700',
            position: 'absolute',
            top: '20%',
            left: '30%',
            zIndex: 'tooltip',
            width: '61.5%'
          }}>
        <PostList posts={posts}/>
        <button onClick={addPost}>New Post</button>
        </Paper>
        </>
        
    )
}
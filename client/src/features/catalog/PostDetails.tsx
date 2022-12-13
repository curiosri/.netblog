import { Box, Button, createTheme, Divider, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableRow, ThemeProvider, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Post } from "../../app/models/post";
import ReactHtmlParser from 'react-html-parser';
import agent from "../../app/api/agent";


export default function PostDetails() {
    const {id} = useParams<{id: string}>();
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState(false);
    const [target, setTarget] = useState(0);

    // get the individual post content
    useEffect(() => {
        agent.Catalog.details(parseInt(id))
        .then(response => setPost(response))
        .catch(error =>console.log(error))
        .finally(() => setLoading(false));
    }, [id])

    if (loading) return <h3></h3>

    if (!post) return <h3> This post doesn't exist </h3>

    // delete the individual post
    function handleDeletePost(id: string) {
        agent.Catalog.delete(parseInt(id))
        .then((response) => {
            console.log(response);
            window.location.href = 'http://localhost:7231/' 
          })
        .catch(error =>console.log(error))
        .finally(() => setLoading(false));
    }
        
    const titletheme = createTheme({
        typography: {
          allVariants: {
            fontFamily: 'Russo One',
            textTransform: 'none',
            fontSize: 25,
            fontWeight: 'bold'
          },
        },
        
      }  
      );
    
    const texttheme = createTheme({
        typography: {
          allVariants: {
            fontFamily: 'Basic',
            textTransform: 'none',
            fontSize: 19
          },
        },
        
      }  
      );

    return (
        <>
         
            <ThemeProvider theme={titletheme}>
            <Grid container spacing={1} width='95.5%'>
            
            <Grid>
                <Grid item xs={15}>
                    <TableContainer>
                    <div className="table" style={{width:'100%' }}>
                        <Table>
                            <TableBody>
                                <TableRow>
                                <ThemeProvider theme={titletheme}>
                                    <TableCell><Typography>{post.title}
                                    </Typography></TableCell></ThemeProvider>
                                </TableRow>
                                <ThemeProvider theme={texttheme}>
                                <TableRow><Typography align="right">{(post.timestamp).toLocaleString()}</Typography></TableRow>
                                <TableRow>
                                    <TableCell><Typography>
                                    <React.Fragment> 
                                                        
                                    <div style={{ whiteSpace: 'pre-wrap' }} >
                                        {ReactHtmlParser(post.text)} 
                                    </div>
                                    </React.Fragment>
                                    </Typography></TableCell>
                                </TableRow> 
                                </ThemeProvider>
                            </TableBody>
                        </Table></div>
                    </TableContainer>
                </Grid>
                <Grid item xs={15}>
                
                <Button size="large"  sx={{left: "0%"}}>
                <Link to={`/posts/${post.id}/update` } style={{ color: 'inherit', textDecoration: 'inherit'}}>
                    EDIT
                </Link></Button>
                
                <Button size="large"  sx={{left: "0%"}} 
                onClick={() => handleDeletePost(id)} >
                    DELETE
                </Button>
                    
                </Grid>
            </Grid>
            
        </Grid>
        </ThemeProvider>
     


        </>
        
    )
    }
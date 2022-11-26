import { Box, createTheme, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableRow, ThemeProvider, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Comment } from "../../app/models/comment";
import ReactHtmlParser from 'react-html-parser';



export default function CommentDetails() {
    const {id} = useParams<{id: string}>();
    const [comment, setComment] = useState<Comment | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`https://localhost:7230/api/comments/${id}`)
            .then(response => setComment(response.data))
            .catch(error => console.log(error))
            .finally(() => setLoading(false));
    }, [id])

    if (!comment) return <h3> "This coment was deleted"</h3>

    const texttheme = createTheme({
        typography: {
          allVariants: {
            fontFamily: 'Basic',
            textTransform: 'none',
          },
        },
        
      }  
      );

    return (
        <>
         
           
            <Grid container spacing={1} width='95.5%'>
            
            <Grid>
                <Grid item xs={15}>
                    <TableContainer>
                    <div className="table" style={{width:'100%' }}>
                        <Table>
                            <TableBody>
                                <TableRow><ThemeProvider theme={texttheme}>
                                    <TableCell><Typography sx={{fontSize: 22}}>
                                    <React.Fragment> 
                                                        
                                    <div style={{ whiteSpace: 'pre-wrap' }} >
                                        {ReactHtmlParser(comment.text)} 
                                    </div>
                                    </React.Fragment>
                                    </Typography></TableCell></ThemeProvider>
                                </TableRow> 
                        
                            </TableBody>
                        </Table></div>
                    </TableContainer>
                </Grid>
                
            </Grid>
            
        </Grid>
        
     


        </>
        
    )
    }

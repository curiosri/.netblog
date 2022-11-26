import { Button, InputBase, MenuItem, MenuList, Typography, ListItem, Box, AppBar, List, Toolbar } from "@mui/material";
import { ThemeProvider, createTheme, styled, alpha } from '@mui/material/styles';
import React from 'react';
import { Link, NavLink } from "react-router-dom";
import './styles.css'



  const titletheme = createTheme({
    typography: {
      allVariants: {
        fontFamily: 'Fuzzy Bubbles',
        fontWeight: 'bold',
        textTransform: 'none',
        fontSize: 40,
      },
    },
    
  }  
  );


  const Search = styled('div')(({ theme } : any) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.black, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.black, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 'auto',
    },
  }));

  const StyledInputBase = styled(InputBase)(({ theme } : any ) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(0)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
      },
    },
  }));  


  const colortheme = createTheme({
    palette: {
      primary: {
        // light: will be calculated from palette.primary.main,
        main: '#c41f1f', 
        // dark: will be calculated from palette.primary.main,
        // contrastText: will be calculated to contrast with palette.primary.main
      },
      secondary: {
       // light: '#0066ff',
        main: '#fdead2',
        // dark: will be calculated from palette.secondary.main,
        //contrastText: '#f2f8c2', 
      },
      }})
  
  
  const Links = [
    {title: 'KOREA NEWS', path:'/news'},
    {title: 'KOREAN LEARNERS', path:'/korean'},
    {title: 'STUDY ABROAD', path:'/abroad'},
    {title: 'EXPAT LIFE', path:'/expat'},
    {title: 'SHOP', path:'/shop'},

  ]

export default function Header() {
    return (
        <>
        <ThemeProvider theme={colortheme}>
        
        
        <AppBar position="fixed" color="primary" sx={{display: 'flex', height: '55px'}}>
        <Toolbar disableGutters sx={{height: '65px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <ThemeProvider theme={titletheme}>
        <Button disableRipple disableElevation color="inherit" style={{backgroundColor: 'transparent'}} >
          <Link to='/' style={{ color: 'inherit', textDecoration: 'inherit'}}>
            MOIZOE
          </Link>
        </Button>
        </ThemeProvider>

 <List sx={{display: 'flex'}}>
        {Links.map(({title, path}) => (
          <Typography fontSize='medium'>
          <ListItem 
            component={NavLink}
            to={path}
            key={path}
            sx={{color: 'inherit'}}

            >
              {title.toUpperCase()}
          </ListItem>
          </Typography>
        ))}

        <Search sx={{ height: '40px'}}>
            <StyledInputBase
              placeholder='Search'
              inputProps={{ 'aria-label': 'search' }}
              
              
            />
          </Search>
        </List>

        <List sx={{display: 'flex'}}>
        
        
       
        <Button size='small' 
        sx={{height: '40px',
        position: 'relative',
        right: '2%'}} 
        variant="outlined" color="inherit" 
        style={{backgroundColor: 'transparent'}} >
          <Link to='/login' style={{ color: 'inherit', textDecoration: 'inherit'}}>
          LOGIN
          </Link>
        </Button>
        </List>
        


        </Toolbar>
        </AppBar>
        <Toolbar />
        </ThemeProvider>




      
        <Box sx={{ width: 330,
        position: 'absolute',
        top: '10%',
        left: '6%',}}>
      
    </Box>
     
        </>
    )
}
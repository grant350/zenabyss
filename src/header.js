import React from 'react';

import { styled,AppBar,Box,Toolbar,Typography,IconButton } from '@mui/material';
import {useState} from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import MoreIcon from '@mui/icons-material/MoreVert';
import {getCookie,deleteCookie,createCookie} from './cookie'
import {UseAuth} from './authentication';
import { useNavigate } from "react-router-dom";

var Header = function(props){
  let auth = UseAuth();
  let navigate = useNavigate();

  console.log('header props',props)
  console.log(auth.isLoggedin)

//  const [loggedin, setLoggedin] = useState(false);
  const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    alignItems: 'flex-start',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2),
    // Override media queries injected by theme.mixins.toolbar
  }));
  function logout(){
    console.log('clicked logout')
    deleteCookie('user_session')
    deleteCookie('user_id')
    navigate('/')
  }


  function login(){
    navigate('/login')
  }

  return (
    <div className="Header">
 <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" component="div">
            Photos
          </Typography>

{auth.isLoggedin? <span onClick={logout} style={{position:'absolute',right:'30px',cursor:'grab'}} variant="h6" color="inherit" component="div"> Logout</span>:<span onClick={login} style={{position:'absolute',right:'30px',cursor:'grab'}} variant="h6" color="inherit" component="div">Login</span>}
        </Toolbar>
      </AppBar>
    </Box>
    </div>

  )
}
export default Header;
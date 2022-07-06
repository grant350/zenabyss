import React from 'react';

import {AppBar,Toolbar,Typography,IconButton } from '@mui/material';
import {useState} from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import {deleteCookie} from './cookie'
import {UseAuth} from './authentication';
import { useNavigate } from "react-router-dom";
import DropDownMenu from './DropDownMenu'
var Header = function(props){
  let auth = UseAuth();
  let navigate = useNavigate();
  let [navOpen,setNav] = useState(false);

  function logout(){
    console.log('clicked logout')
    deleteCookie('user_session')
    deleteCookie('user_id')
    navigate('/')
  }

  function home(){
    navigate('/',{replace:true})

  }
  function login(){
    navigate('/login')
  }

  function toggelNav(bool){
    if (bool !== undefined){
      setNav(!bool)
    } else {
    setNav(!navOpen)
    }
  }

  return (
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton onClick={(e)=>{toggelNav()}} edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
         <img className="logo" alt="logo" onClick={home} src="/favicon.png"/>
          <Typography className="logoName" variant="h6" color="inherit" component="div">
            Zenabyss
          </Typography>

{auth.isLoggedin? <span onClick={logout} style={{position:'absolute',right:'30px',cursor:'grab'}} variant="h6" color="inherit" component="div"> Logout</span>:<span onClick={login} style={{position:'absolute',right:'30px',cursor:'grab'}} variant="h6" color="inherit" component="div">Login</span>}
        </Toolbar>
          {navOpen? <DropDownMenu setNav={setNav}> </DropDownMenu>: null}
      </AppBar>

  )
}
export default Header;
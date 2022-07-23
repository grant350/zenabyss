import React from 'react';

import {AppBar,Toolbar,Typography,IconButton,Tabs,Tab,Paper,MenuItem,MenuList,Stack } from '@mui/material';
import {useState} from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import {deleteCookie} from './cookie'
import {UseAuth} from './authentication';
import { useNavigate } from "react-router-dom";
import './global.scss';

import Settings from './settings/settings.js';
var routeObject =Settings.getRoutes();
var DropDownMenu = function(props){
  let auth = UseAuth();
  let navigate = useNavigate()

  function nav(route){
    navigate(route)
    props.setNav(false);
  }
  function logout(){
    deleteCookie('user_session')
    deleteCookie('user_id')
    navigate('/')
  }
  return (
    <Stack className="dropdown-ct" direction="row" spacing={2}>
      <Paper>
        <MenuList>
          {Object.keys(routeObject).map(key=>{
            var r = routeObject[key]
            // var name = key
            r.label[0].toUpperCase();
            return <MenuItem onClick={(e)=>{nav(r.path)}}>{r.label}</MenuItem>
          })}
          {auth.isLoggedIn? <MenuItem>Logout</MenuItem>:<MenuItem onClick={(e)=>{logout(); nav('/login')}}>Login</MenuItem>}
        </MenuList>
      </Paper>

    </Stack>
  );

}




var Header = function(props){

  let auth = UseAuth();
  let navigate = useNavigate();
  let [navOpen,setNav] = useState(false);

  var handle_route_change = (e, newValue)=> {
    Object.keys(routeObject).forEach((key,index)=>{
      var r = routeObject[key]
      var name = key
      if (name === newValue){
        navigate(r.path,{ replace: true });
      }
    })
  };

  function logout(){
    deleteCookie('user_session')
    deleteCookie('user_id')
    navigate('/')
  }


  function toggelNav(bool){
    if (bool !== undefined){
      setNav(!bool)
    } else {
    setNav(!navOpen)
    }
  }

  return (
      <AppBar style={{backgroundColor:props.header_color}} position="static">
        <Toolbar variant="dense">
          {/* #d1b58f!important */}
          <IconButton onClick={(e)=>{toggelNav()}} edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
         <img className="logo" alt="logo" onClick={(e)=>{ navigate('/',{replace:true})}} src="/images/logo.png"/>
          <Typography className="logoName" variant="h6" color="inherit" component="div">
            Zenabyss
          </Typography>
          <div className="tab-ct">
        <Tabs  value={props.component ?? false} onChange={handle_route_change}>

          {Object.keys(routeObject).map((key,index)=>{
            var r = routeObject[key]
            var name = key
              if (r.makeTab){
                return  <Tab className="hovertab" key={index} label={r.label} value={name}  />
              } else {
                return null
              }
            })}

        </Tabs>
         </div>

          {auth.isLoggedin? <span onClick={logout} style={{position:'absolute',right:'30px',cursor:'grab'}} variant="h6" color="inherit" component="div"> Logout</span>:<span  onClick={(e)=>{ navigate('/login',{replace:true})}} style={{position:'absolute',right:'30px',cursor:'grab'}} variant="h6" color="inherit" component="div">Login</span>}
        </Toolbar>
          {navOpen? <DropDownMenu setNav={setNav}> </DropDownMenu>: null}
      </AppBar>

  )
}
export default Header;
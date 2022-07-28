import {React, useEffect} from 'react';

import {AppBar,Toolbar,Typography,IconButton,Tabs,Tab,Paper,MenuItem,MenuList,Stack } from '@mui/material';
import {useState} from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import {deleteCookie} from './utility_functions/cookie'
import {UseAuth} from './utility_components/authentication';
import { useNavigate ,useLocation} from "react-router-dom";

import Settings from './app_settings/settings.js';
var routeObject =Settings.getRoutes();

var DropDownMenu = function(props){
  let auth = UseAuth();
  let navigate = useNavigate()

  function nav(route){
    navigate(route)
    props.setNav(false);
  }
  var  logout = ()=>{
    deleteCookie('user_session')
    deleteCookie('user_id')
    auth.setLoggedin(false)
    navigate('/')
  }
  return (
    <Stack className="dropdown-ct" direction="row" spacing={2}>
      <Paper>
        <MenuList>
          {Object.keys(routeObject).map(key=>{
            var r = routeObject[key]
            r.label[0].toUpperCase();
            if (key !== "login"){
              if (r.redirect){
                r.path = r.redirect;
              }
              return <MenuItem key={key} onClick={(e)=>{nav(r.path)}}>{r.label}</MenuItem>
            } else {
              return null
            }
          })}
          {auth.isLoggedIn? <MenuItem>Logout</MenuItem>:<MenuItem onClick={(e)=>{logout(); nav('/login')}}>Login</MenuItem>}
        </MenuList>
      </Paper>

    </Stack>
  );

}




var Header = function(props){
  var location = useLocation();
  var pageload_component = "home"
  var pageload_color = "#d1b58f"

  {Object.keys(routeObject).forEach((key,index)=>{
    var route = routeObject[key]
        if (location.pathname.includes(route.path)){
          pageload_component = key
        }
    })}
    if (pageload_component === "home"){
      pageload_color = "transparent";
    } else {
      pageload_color = "#d1b58f";
    }
  var [component,setComponent] = useState(pageload_component)

  let auth = UseAuth();
  let navigate = useNavigate();
  let [navOpen,setNav] = useState(false);
  let [header_color,setHeader_color] = useState(pageload_color);



  var  logout = ()=>{
    deleteCookie('user_session')
    deleteCookie('user_id')
    auth.setLoggedin(false)

    navigate('/')
  }

 var changeTab = (path,value)=>{
  setComponent(value)
  navigate(path,{ replace: true });
 }

  function toggelNav(bool){
    if (bool !== undefined){
      setNav(!bool)
    } else {
    setNav(!navOpen)
    }
  }

  return (
      <AppBar className="top_header" style={{backgroundColor:header_color}} position="static">
        <Toolbar variant="dense">
          {/* #d1b58f!important */}
          <div className="hamburger">
          <IconButton  onClick={(e)=>{toggelNav()}} edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          </div>
         <img className="logo" alt="logo" onClick={(e)=>{ navigate('/',{replace:true})}} src="/images/logo.png"/>
          <Typography className="logoName" variant="h6" color="inherit" component="div">
            Zenabyss
          </Typography>
          <div className="tab-ct">
        <Tabs  value={component ?? false} onChange={(e)=>{console.log("does nothing")}}>

          {Object.keys(routeObject).map((key,index)=>{
            var r = routeObject[key]
              if (r.makeTab){
                if (r.redirect){
                  r.path = r.redirect;
                }
                return  <Tab onClick={(e)=>{changeTab(r.path,key) }} className="hovertab" key={index} label={r.label} value={key}  />
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
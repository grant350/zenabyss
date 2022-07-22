import React from 'react';
import './global.scss';
import Paper from '@mui/material/Paper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import {useNavigate} from "react-router-dom";

const DropDownMenu = function (props){

  var isLoggedIn = false;
  let navigate = useNavigate()


  function nav(route){
    navigate(route)
    props.setNav(false);

  }

  // function logout(){
  //   // isLoggedIn
  // }

  return (
    <Stack className="dropdown-ct" direction="row" spacing={2}>
      <Paper>
        <MenuList>
        <MenuItem onClick={(e)=>{nav('/')}}>Home</MenuItem>
        <MenuItem onClick={(e)=>{nav('/insert/product')}}>Product</MenuItem>
        <MenuItem onClick={(e)=>{nav('/insert/order')}}>Order</MenuItem>
        <MenuItem onClick={(e)=>{nav('/About')}}>About</MenuItem>
        <MenuItem onClick={(e)=>{nav('/contact')}}>Contact</MenuItem>

          {isLoggedIn? <MenuItem>Logout</MenuItem>:<MenuItem onClick={(e)=>{nav('/login')}}>Login</MenuItem>}
        </MenuList>
      </Paper>

    </Stack>
  );

}
export default DropDownMenu;
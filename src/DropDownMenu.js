import {React,useEffect,useRef,useState} from 'react';
import './global.scss';
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
const DropDownMenu = function (props){

  var isLoggedIn = false;




  return (
    <Stack className="dropdown-ct" direction="row" spacing={2}>
      <Paper>
        <MenuList>
          <MenuItem  >Profile</MenuItem>
          <MenuItem>My account</MenuItem>
          {isLoggedIn? <MenuItem>login</MenuItem>:<MenuItem>Logout</MenuItem>}
        </MenuList>
      </Paper>

    </Stack>
  );

}
export default DropDownMenu;
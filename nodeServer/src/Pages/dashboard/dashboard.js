import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import Drawer from '@mui/material/Drawer';
// import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import List from '@mui/material/List';import ListItemIcon from '@mui/material/ListItemIcon';
import CloseIcon from '@mui/icons-material/Close';
import {List,Toolbar,CssBaseline,Drawer,Box,Divider,IconButton,ListItemButton,ListItem,ListItemIcon,ListItemText} from '@mui/material'
import * as icons from  '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Settings from '../../app_settings/settings'
import './dashboard.scss'
import {useNavigate} from "react-router-dom";
import Catagories from './dashboard_catagories'
// import AnalyticsIcon from '@mui/icons-material/Analytics';
import PageviewIcon from '@mui/icons-material/Pageview';
import SearchForm from './searchForm';

const drawerWidth = 240;
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

function Dashboard(props) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [search_dropdown_open, setSearch_dropdown_open] = React.useState(false);

  let navigate = useNavigate()

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  var sub_routes = Settings.getSubRoutes("dashboard")

  return (

    <Box className="dashboard" sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar sx={{position:"relative"}}>

          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          {search_dropdown_open? <CloseIcon  sx={{position: "absolute",right:"30px",cursor:"grab"}} onClick={(e)=>{setSearch_dropdown_open(!search_dropdown_open)}}></CloseIcon>:<PageviewIcon sx={{position: "absolute",right:"30px",cursor:"grab"}} onClick={(e)=>{setSearch_dropdown_open(!search_dropdown_open)}} className="search_icon" />}
          {search_dropdown_open?  <Box className="search_dropdown"><SearchForm></SearchForm></Box>:null }


        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>



          {Object.keys(sub_routes).map((key, index) => {
            var obj = sub_routes[key];
         return (   <ListItem  onClick={(e)=>{ navigate('/dashboard/'+obj.path)}} key={key} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {obj.icon? < obj.icon /> : null}
                </ListItemIcon>
                <ListItemText primary={obj.label} />
              </ListItemButton>
            </ListItem>
         )
})}
        </List>
      </Drawer>
      <Main className="content" open={open}>
        <DrawerHeader />

        <div className="dashboard-page">

        </div>
      </Main>
    </Box>
  );
}



export default Dashboard;
import './App.scss';
import React from 'react';
import {Box,List,FormLabel,ListItem,ListItemAvatar,Avatar,ListItemText,TextField,Button,Typography} from  '@mui/material';
import axios from 'axios';
import AddSub from './addsub'
import {getCookie,deleteCookie,createCookie} from './cookie'

class SearchForm extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      items:[]
    }
    this.search = this.search.bind(this)

  }


   search(e){
    var val = e.target.value;
     axios.get('http://127.0.0.1:8080/searchProducts',{params:{query:val,user_id:getCookie('user_id')},headers:{token:"Bearer "+ getCookie('user_id')} }).then(response=>{
      console.log(response.data)
      this.setState({items:response.data.data})
     })

   }

   // implement react router as it would be eaiser to send data to other components
  //gonna clean up some code here.
   render(){

    return (<Box  className="foundRelated" sx={{
      width: "50%",
      height: "auto",
      backgroundColor: 'primary.dark',
      maxHeight: "800px",overflow: "scroll"
    }} >
    <div className="wrapper" style={{"display":"block","width":"100%"}}>
    <TextField onChange={this.search} id="outlined-basic"  label="SEARCHBAR" variant="outlined" /></div>
      {this.state.items.map((item,index)=>{
        return (  <ListItem key={index} style={{borderBottom:"1px solid white",maxHeight: "140px"}} alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="productimage" src={item.image} />
        </ListItemAvatar>
      <ListItemText
    primary={item.brand + " " + item.model}
    secondary={
      <React.Fragment>
        <Typography
          sx={{ display: 'block',  margin: '10px 10px' }}
          component="span"
          variant="body2"
          color="text.primary"
        >
          upc: {item.upc}
        </Typography>
        <Typography
          sx={{ display: 'block',  margin: '10px 10px' }}
          component="span"
          variant="body2"
          color="text.primary"
        >
          {item.title}  quantity: {item.quantity}
        </Typography>
      </React.Fragment>
    }
  />
  </ListItem>);
      })}
     <List component="nav" aria-label="main mailbox folders">

     </List>

    </Box>)

   }






}
export default SearchForm;



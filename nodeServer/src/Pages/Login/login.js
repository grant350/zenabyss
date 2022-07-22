import {React,useRef} from 'react';
import {useNavigate,Link} from "react-router-dom";
import {FormGroup} from '@zenabyss/reactformbuilder';
import {Button,FormControl,TextField,FormHelperText} from '@mui/material'
import './login.scss';
import axios from 'axios';
import {createCookie,deleteCookie} from '../../cookie';

function Login(props){

  let navigate = useNavigate()
  const ref = useRef(null);

  function FormContainer(props){
    return (<div className="noborder-ct" style={{textAlign:'center',boxSizing:'content-box',padding:'20px',border:"2px solid "+props.border}}> {props.children}</div>)
  }

  function FormField(props){

    return (<FormControl style={{left: "0px", padding: 0}}>
    <FormHelperText>{props.label}</FormHelperText>
    <TextField id="filled-basic" helperText={props.helperText} InputProps={{ style: { fontSize: "10px"} }} size="small" variant="filled"  style={{borderLeft:"20px solid "+props.border, padding: 0,background:'white',borderRadius:"10px",boxSizing: "border-box"}} type={props.controlType} onChange={(e)=>{props.update(e.target.value)}} value={props.value}></TextField>
  </FormControl>
  )

  }

  var fgroup = {
    "username":{
      "type":"formControl",
      "required":true,
      "helperText":"",
      "label":"please enter  your username",
      "validator": (val,obs)=>{
        // make req to server to check users
        if (val.length >0){
          obs.next(true);
        } else {
          obs.next(false);
        }
      }
    },
    "password":{
      "type":"formControl",
      "required":true,
      "label":"please enter your password",
      "JSXElement":FormField,
      "validator": (val,obs)=>{
        if (val.length >0){
          obs.next(true);
        } else {
          obs.next(false);
        }
      }
    }

  }

  var Submit = (event)=> {
    event.preventDefault();
     if (ref.current){
       var form = ref.current;
      if (form.state.status === "VALID"){
        var data = form.getData();
        form.reset();

        axios.post('/login',data).then(response=>{
          console.log('response',response);
          if (response.data.token !== undefined){
            deleteCookie('user_session')
            deleteCookie('user_id')
            createCookie('user_id',response.data.user_id,2)
            createCookie('user_session',response.data.token,2)
          }
          if (response.data.redirect !== undefined){
            navigate(response.data.redirect,{ replace: true });
          }
        })
      }
     }
  }



return (
  <div className="login">
  <div className="background-image"  style={{ "backgroundImage": "url(/main_photo.jpg)"}}>
    <div className="blackness">

        <div className="login-wrapper">
        <FormGroup controls={fgroup} name="login" ref={ref}  JSXContainer={FormContainer}></FormGroup>
        <Link to="/signup"><span className="signup">sign up</span></Link>
        <div className="btn-wrapper"><Button onClick={Submit} className="login-btn" variant="contained" type="submit">Submit</Button></div>
        </div>
    </div>
    </div>


  </div>
);

}

export default Login;
import {React,useState,useRef} from 'react';
import {useNavigate,useLocation,Link} from "react-router-dom";
import {UseAuth} from '../../authentication';
import {FormGroup} from '@zenabyss/reactformbuilder';
import {Button,FormControl,TextField,FormHelperText} from '@mui/material'
import './login.scss';

function Login(props){

  let location = useLocation();
  let navigate = useNavigate()
  let from = location.state?.from?.pathname || "/";
  let auth = UseAuth();
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
  var username  = useState('');
  var password  = useState('');

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

   var handleSubmit =(event)=> {
    event.preventDefault();

    // let formData = new FormData(event.currentTarget);
    // let username = formData.get("username") as string;
    // get cookie and make requests;

    auth.signin({username,password}, () => {
      navigate(from, { replace: true });
    });
  }


return (
  <div className="login">
  <div className="background-image" >
    <div className="blackness">

        <div className="login-wrapper">
        <FormGroup controls={fgroup} name="login" ref={ref}  JSXContainer={FormContainer}></FormGroup>
        <Link to="/signup"><span className="signup">sign up</span></Link>
        <div className="btn-wrapper"><Button className="login-btn" variant="contained" type="submit">Submit</Button></div>
        </div>
    </div>
    </div>


  </div>
);

}

export default Login;
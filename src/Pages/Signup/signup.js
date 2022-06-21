import {React,useState,useRef} from 'react';
import {useNavigate,useLocation,Link} from "react-router-dom";
import {UseAuth} from '../../authentication';
import {FormGroup} from '@zenabyss/reactformbuilder';
import {Button,FormControl,TextField,FormHelperText} from '@mui/material'
import './signup.scss';
import axios from 'axios';
function Signup(props){

  let location = useLocation();
  let navigate = useNavigate()
  let from = location.state?.from?.pathname || "/";
  let auth = UseAuth();
  const ref = useRef();

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
      "controlType":"text",
      "helperText":"please enter your usersame",
      "label":"Username",
      "validator": (val,obs)=>{
        // make req to server to check users
        if (val.length >0){
          obs.next(true);
        } else {
          obs.next(false);
        }
      }
    },
     "email":{
      "type":"formControl",
      "required":true,
      "controlType":"email",
      "label":"email",
      "helperText":"please enter your email",
      "JSXElement":FormField,
      "validator": (val, obs, core) => {
        // console.log('val',core.parent.refrences.password.current.props.value)
        //   console.log(val === core.parent.refrences.password.current.props.value)

        if (val.length > 6 && val.includes('@')) {
          // core.parent.refrences.username.current.value;
          obs.next(true);
        } else {
          obs.next(false);
        }

      }
    },
    "password":{
      "type":"formControl",
      "required":true,
      "controlType":"password",
      "label":"Password",
      "helperText":"please enteryour password",
      "JSXElement":FormField,
      "validator": (val,obs,core)=>{
        if (val.length >0){
          // core.parent.refrences.username.current.update('haha');

          obs.next(true);
        } else {
          obs.next(false);
        }
      }
    },
    "passwordCheck":{
      "type":"formControl",
      "required":true,
      "controlType":"password",
      "label":"passwordCheck",
      "helperText":"please enteryour password",
      "JSXElement":FormField,
      "validator": (val, obs, core) => {
          // console.log(val === core.parent.refrences.password.current.props.value)
      if (core.parent.refrences.password.current){
          if (val === core.parent.refrences.password.current.props.value) {
          // core.parent.refrences.username.current.value;
          obs.next(true);
        } else{
          obs.next(false);
        }
      }
        else {
          obs.next(false);
        }
      }
    }

  }

   var Submit =(event)=> {
    event.preventDefault();
     if (ref.current){
       var form = ref.current;
      if (form.state.status === "VALID"){
        var data = form.getData();
        delete data.passwordCheck;
        axios.post('http://127.0.0.1:8080/createUser',data).then(response=>{
          console.log('response',response);
          form.reset();
          //set cookie;
          //when created auto login auth.signin
        })
        // make request to server

      }
     }
    // auth.signin({username,password}, () => {
    //   navigate(from, { replace: true });
    // });
  }


return (
  <div className="signup">
  <div className="background-image" >
    <div className="blackness">

        <div className="login-wrapper">
        <FormGroup controls={fgroup} name="login" ref={ref}  JSXContainer={FormContainer}></FormGroup>
        <div className="btn-wrapper"><Button className="login-btn" onClick={Submit} variant="contained" type="submit">Submit</Button></div>
        </div>
    </div>
    </div>


  </div>
);

}

export default Signup;
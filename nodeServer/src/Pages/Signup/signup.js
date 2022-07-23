import {React,useState,useRef} from 'react';
import {useNavigate} from "react-router-dom";
import {FormGroup} from '@zenabyss/reactformbuilder';
import {Button,FormControl,TextField,FormHelperText,Box} from '@mui/material'
import './signup.scss';
import axios from 'axios';
import {createCookie,deleteCookie} from '../../cookie';
function Signup(props){

  let navigate = useNavigate()
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

  const [error_message,setError_message] = useState(null)

  var fgroup = {
    "username":{
      "type":"formControl",
      "required":true,
      "controlType":"text",
      "helperText":"please enter your usersame",
      "label":"Username",
      "validator": (val,obs)=>{
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
        const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (val.match(regex)) {
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
      if (core.parent.refrences.password.current){
          if (val === core.parent.refrences.password.current.props.value) {
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

   var Submit = (event)=> {
    event.preventDefault();
     if (ref.current){
       var form = ref.current;
      if (form.state.status === "VALID"){
        var data = form.getData();
        delete data.passwordCheck;
        axios.post('/createUser',data).then(response=>{
          form.reset();
          if (response.data.token !== undefined){
            deleteCookie('user_session')
            deleteCookie('user_id')
            createCookie('user_id',response.data.user_id,2)
            createCookie('user_session',response.data.token,2)
          }
          if (response.data.redirect !== undefined){
            navigate(response.data.redirect,{ replace: true });
          }
          if (response.data.error){

            setError_message(response.data.error)
            setTimeout(()=>{
              setError_message(null)
            },4000)
          }
        }).catch(err=>{
          setError_message(err)
        })
      }
     }
  }


return (
  <div className="signup">
     {error_message?<Box sx={{ flexGrow: 1 }} className="error_message">{error_message}</Box>:null}
  <div className="background-image"  style={{ "backgroundImage": "url(/images/main_photo.jpg)"}}>
    <div className="blackness">
        <div className="login-wrapper">
        <FormGroup controls={fgroup} name="login"  ref={ref}  JSXContainer={FormContainer}></FormGroup>
        <div className="btn-wrapper"><Button className="login-btn" onClick={Submit} variant="contained" type="submit">Submit</Button></div>
        </div>
    </div>
    </div>


  </div>
);

}

export default Signup;
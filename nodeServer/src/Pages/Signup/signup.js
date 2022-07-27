import {React,useState,useRef} from 'react';
import {useNavigate} from "react-router-dom";
import {FormGroup} from '@zenabyss/reactformbuilder';
import {Button,Box} from '@mui/material'
import './signup.scss';
import axios from 'axios';
import {createCookie,deleteCookie} from '../../utility_functions/cookie';
function Signup(props){

  let navigate = useNavigate()
  const ref = useRef();

  function FormContainer(props){
    return (<div className="noborder-ct" style={{position:'relative', textAlign:'center',boxSizing:'content-box',padding:'20px',border:"2px solid "+props.border}}> {props.children}</div>)
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
      "label":"Email",
      "helperText":"please enter your email",
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
      "label":"Retype Password ",
      "helperText":"please enteryour password",
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
    <div className="alignment">
        <div className="wrapper">
          <div style={{ "backdrop-filter": "blur(5px)", width: "500px",height: "auto"}}>
        <FormGroup controls={fgroup} name="signup"  ref={ref}  JSXContainer={FormContainer}></FormGroup>
        <div className="btn-wrapper"><Button onClick={Submit} variant="contained" type="submit">Submit</Button></div>
        </div>
        </div>
    </div>
    </div>


  </div>
);

}

export default Signup;
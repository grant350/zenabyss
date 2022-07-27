import {React,useRef,useState} from 'react';
import {useNavigate,Link} from "react-router-dom";
import {FormGroup} from '@zenabyss/reactformbuilder';
import './login.scss';
import axios from 'axios';
import {createCookie,deleteCookie} from '../../utility_functions/cookie';
import {Button,Box} from '@mui/material'

function Login(props){

  let navigate = useNavigate()
  const ref = useRef(null);
  const [error_message,setError_message] = useState(null)

  function FormContainer(props){
    return (<div className="noborder-ct" style={{textAlign:'center',boxSizing:'content-box',padding:'20px',border:"2px solid "+props.border}}> {props.children}</div>)
  }


  var fgroup = {
    "username":{
      "type":"formControl",
      "required":true,
      "helperText":"",
      "label":"Please enter  your username",
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
      "label":"Please enter your password",
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
        }).catch(err=>{
          console.log(err)
          setError_message("there is mismatch information that was submitted")
          setTimeout(()=>{
            setError_message(null)
          },4000)
        })
      }
     }
  }

return (
  <div className="login">
     {error_message?<Box sx={{ flexGrow: 1 }} className="error_message">{error_message}</Box>:null}
  <div className="background-image"  style={{ "backgroundImage": "url(/images/main_photo.jpg)"}}>
    <div className="alignment">
        <div className="wrapper">
          <div style={{ "backdrop-filter": "blur(5px)", width: "500px",height: "auto"}}>
        <FormGroup controls={fgroup} name="login"  ref={ref}  JSXContainer={FormContainer}></FormGroup>
        <Link to="/signup"><span className="signup-btn">Sign up</span></Link>

        <div className="btn-wrapper"><Button onClick={Submit} variant="contained" type="submit">Submit</Button></div>
        </div>
        </div>
    </div>
    </div>


  </div>
);

}

export default Login;
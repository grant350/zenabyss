import {React, useRef,useState,Fragment} from 'react';
import './contact.scss';
import {FormGroup} from '@zenabyss/reactformbuilder';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import axios from 'axios';

function MessageComponent(props){


  return (<Fragment>
    <label style={{width:'100%',display:'block'}}> {props.label}</label>
   <TextareaAutosize
    maxRows={8}
    aria-label="maximum height"
    placeholder="Enter your message here"
    value={props.value}
    onChange={(e)=>{props.update(e.target.value)}}
    style={{ width: '60%' ,height:"200px",borderLeft:'12px solid '+props.border}}
  /> </Fragment>)

}


const Contact = function (props){
  var [message,setMessage] = useState(null)
  var [barColor,setBarColor] = useState('green')

  var ref = useRef()
  var form = {
    "fullname":{
      "type":"formControl",
      "label":"Fullname",
      "helperText":"Bob Marley",
      "validator": (val,obs)=>{
        var valid = true
        if (val.length < 3){
          valid = false
        }
        val.split('').forEach(char=>{
          var unwanted = '!@#$%^&*()=+<>,.?/[]{}|≈ç√∫˜µåß∂ƒ©˙∆˚¬œ∑´®†¥¨ˆøπ≤≥÷…æ¡™£¢∞§¶•ªº–1234567890'
            console.log(unwanted.includes(char))
          if (unwanted.includes(char) ){
            valid= false
          }
        })
        if (valid){
          obs.next(true)
        } else {
          obs.next(false)
        }
      }

    },
    "email":{
      "type":"formControl",
      "label":"Email",
      "helperText":"soundbreakr1@gmail.com",
      "validator": (value,obs)=>{
        value = value.toLowerCase();
        var isValid=true;
        if (value.includes('@') === false){
          isValid = false
        } else {
          var splitvalue = value.split('@');
          var left = splitvalue[0];
          var right = splitvalue[1];
          try{
             if (right.split('.')[1].length < 2){
               isValid=false
             }
             if (left.length < 3){
               isValid = false;
             }
          } catch{
            isValid = false
          };
        }
        if (isValid){
          obs.next(true)
        } else {
          obs.next(false)
        }
      }
    },
    "phone":{
      "type":"formControl",
      "label":"Phone",
      "helperText":"999-999-9999",
      "validator": (value,obs)=>{
        var isValid = true;
        if (value.length > 0){
          try {
            var splitvalue = value.split('-');
            if (splitvalue.length !== 3){
              isValid=false
            }
            if (value.length !== 12){
              isValid = false;
            }
            var accepted = '1234567890-'

            value.split('').forEach(num=>{
              console.log(accepted.includes(num))
              if (accepted.includes(num) === false){
                isValid=false
              }
            });
           } catch {
            isValid=false
          }

        }
        obs.next(isValid)
      }
    },
    "textfield":{
      "type":"formControl",
      "label":"Message",
      "JSXElement":MessageComponent,
      "validator":(value,obs)=>{
        var isValid=true;
        var notAccepted = ['fuck','shit','crap','stupid','bitch','dumb','asf','dumbass','fuckface']
        value.split(' ').forEach(word=>{
          if (notAccepted.includes(word)){
            isValid = false
          }
        })

        obs.next(isValid)

      }
    }
  }

function submit(){
  if(ref.current.isValid()){
    var data = ref.current.getData();
    axios.post('/contact',data).then(response=>{
        ref.current.reset();
          setMessage('message has been sent')
          setBarColor('green')
    }).catch(err=>{
      console.log(err)
      setMessage('there was an error with the info you provided')
      setBarColor('red')
    })
  }
}

return (<Fragment>
  {message? <span style={{background:barColor}} className="message_bar">{message}</span>:null}
  <div className="about">
    <FormGroup ref={ref} controls={form} name="contact_form"></FormGroup>
    <button className="btn" style={{position:'relative',right:'-60%'}} onClick={submit}>Submit</button>
  </div>
  </Fragment>);

}
export default Contact;
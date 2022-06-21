import {useState,useContext, useEffect,createContext,React} from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import {getCookie,deleteCookie,createCookie} from './cookie'
const AuthContext = createContext(null);

const AuthProvider = (props)=>{
const [isLoggedin, setLoggedin] = useState(false);
let navigate = useNavigate();

useEffect(()=>{
  axios.get('http://127.0.0.1:8080/authenticate',{headers:{ user_id:getCookie('user_id'),Authorization:'Bearer '+getCookie('user_session')}}).then(response=>{
    if (response.data.token){
      deleteCookie('user_session');
      createCookie('user_session',response.data.token,2);
    }
    if (response.data.authorized){
      setLoggedin(true);
    } else {
      setLoggedin(false);
    }

})

})

return (
  <AuthContext.Provider isLoggedin={isLoggedin} value={{isLoggedin}}>
    {props.children}
  </AuthContext.Provider>
  )
}

var UseAuth = ()=>{
  return useContext(AuthContext);
}
export  {AuthProvider, UseAuth};


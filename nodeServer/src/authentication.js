import {useState,useContext, useEffect,createContext,React} from 'react';
import axios from 'axios';
import {getCookie,deleteCookie,createCookie} from './cookie'
const AuthContext = createContext(null);

const AuthProvider = (props)=>{
const [isLoggedin, setLoggedin] = useState(false);

useEffect(()=>{
  axios.get('/authenticate',{params:{user_id:getCookie('user_id')}, headers:{ Authorization:'Bearer '+getCookie('user_session')}}).then(response=>{
    if (response.data.token){
      deleteCookie('user_session');
      deleteCookie('user_id');
      createCookie('user_session',response.data.token,2);
    }
    if (response.data.authorized){
      setLoggedin(true);
    } else {
      deleteCookie('user_session');
      deleteCookie('user_id');
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


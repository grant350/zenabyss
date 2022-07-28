import {useState,useContext, useEffect,createContext,React} from 'react';
import axios from 'axios';
import {getCookie,deleteCookie,createCookie} from '../utility_functions/cookie'
const AuthContext = createContext(null);

const AuthProvider = (props)=>{
const [role, setLoggedin] = useState(false);

useEffect(()=>{
  axios.get('/authenticate',{params:{user_id:getCookie('user_id')}, headers:{ Authorization:'Bearer '+getCookie('user_session')}}).then(response=>{
    if (response.data.token){
      deleteCookie('user_session');
      deleteCookie('user_id');
      createCookie('user_session',response.data.token,2);
    }
    if (response.data.authorized){
      //response.data.role later
      setLoggedin(true);
    } else {
      deleteCookie('user_session');
      deleteCookie('user_id');
      setLoggedin(false);
    }
})
})

return (
  <AuthContext.Provider isLoggedin={role} value={{isLoggedin:role,setLoggedin:setLoggedin}}>
    {props.children}
  </AuthContext.Provider>
  )
}

var UseAuth = ()=>{
  return useContext(AuthContext);
}
export  {AuthProvider, UseAuth};

//make catagories for dashboard
// when user is seller then give acess to dashboard on client, rn its set to all
// display user name on client with local storage and delete local storage on log out or when cookeie is not active
import {useState,useContext, createContext,React} from 'react';
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

const AuthProvider = ({children})=>{
const [isLoggedin, setLoggedin] = useState(false);
let navigate = useNavigate();

const signin = ()=>{
  setLoggedin(true);
  navigate("/insert/product");
}

const signout = ()=>{
  setLoggedin(false);
  navigate("/login");
}

return (
  <AuthContext.Provider value={{isLoggedin,signin,signout}}>
    {children}
  </AuthContext.Provider>
  )
}

var UseAuth = ()=>{
  return useContext(AuthContext);
}
export  {AuthProvider, UseAuth};


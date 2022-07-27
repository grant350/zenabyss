// import {React,} from 'react';
import React from 'react'
// import { Routes, Route,useNavigate,useLocation ,Navigate} from "react-router-dom";

import Login from '../Pages/Login/login';
import Signup from '../Pages/Signup/signup';
import routeObject from './routes.js';



class App_Settings{
  constructor(instructions){
    this.setupLogin = instructions.setupLogin? instructions.setupLogin:false
    this.getRoutes = this.getRoutes.bind(this)
  }
  //store userid in url nad username in url
  // authorize matches instead of if everyone logs in they get to go to all pages [admin,seller,buyer,null]
    getRoutes(){

    /*
      {
        "Account":{
        "component": <Account />
         "routes": {"main":{"path":`/account`,"makeTab":false}}
       },
       "Dashboard":{
        ""
       },
       "Login": {
        "component":<Login/>
        "route":{}
      },
      "Signip":{
        "component":<Signup/>
        "route":{}
      }

      }
    */


      if (this.setupLogin){
        routeObject['signup']= {"path":'/signup',"makeTab":false ,"name":"signup","set":false,"label":"signup","isPublic":true,"component":<Signup/>}
        routeObject['login'] = {"path":'/login',"makeTab":false,"name":"login","set":false,"label":"login","isPublic":true,"component":<Login/>}
        return routeObject;
      } else {
        return routeObject;
      }
    }


}

var Settings = App_Settings({setupLogin:true})

export default Settings
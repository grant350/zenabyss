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
    this.getSubRoutes = this.getSubRoutes.bind(this)
  }
  //store userid in url nad username in url
  // authorize matches instead of if everyone logs in they get to go to all pages [admin,seller,buyer,null]
    getRoutes(){
      if (this.setupLogin){
        routeObject['signup']= {"path":'/signup',"makeTab":false , "label":"signup","accessibleTo":["all"],"component":<Signup/>}
        routeObject['login'] = {"path":'/login',"makeTab":false, "label":"login","accessibleTo":["all"],"component":<Login/>}
        return routeObject;
      } else {
        return routeObject;
      }
    }
    getSubRoutes(name){
      var object = null
      Object.keys(routeObject).forEach(key=>{
        var r = routeObject[key];
        if (name === key){
          object= r.routes;
        }
      })
      return object
    }


}

var Settings = new App_Settings({setupLogin:true})

export default Settings
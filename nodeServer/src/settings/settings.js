// import {React,} from 'react';
import React from 'react'
// import { Routes, Route,useNavigate,useLocation ,Navigate} from "react-router-dom";

import Login from '../Pages/Login/login';
import Signup from '../Pages/Signup/signup';

// import {AuthProvider,UseAuth} from '../authentication';
// import RequireAuth from '../requireAuth'


//routes
import routeObject from './routes.js';





var Settings = {
  "getRoutes": ()=>{

    routeObject['signup']= {"path":'/signup',"makeTab":false ,"name":"signup","set":false,"label":"signup","isPublic":true,"component":<Signup/>}
    routeObject['login'] = {"path":'/login',"makeTab":false,"name":"login","set":false,"label":"login","isPublic":true,"component":<Login/>}

    return routeObject;
  }

}

export default Settings
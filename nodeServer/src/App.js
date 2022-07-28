import './App.scss';
import {React,useState} from 'react';

import { Routes, Route,Outlet} from "react-router-dom";
import {AuthProvider} from './utility_components/authentication';
import RequireAuth from './utility_components/requireAuth'
import Header from './header';
import Settings from './app_settings/settings.js';
import Dashboard from './Pages/dashboard/dashboard'
import MakeRoutes from './utility_components/make_routes'
var routeObject =Settings.getRoutes();

var App = function ()  {

    return (
      <AuthProvider>
      <div className="App">
         <Header className="top_header"  />
        <div className="boxContainer">
        <Routes>

        {MakeRoutes(routeObject,"setComponent")}

      </Routes>
      </div>

      </div>
      </AuthProvider>

    );
  }



export default App;

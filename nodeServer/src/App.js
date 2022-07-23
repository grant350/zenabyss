import './App.scss';
import {React,useState} from 'react';

import { Routes, Route} from "react-router-dom";
import {AuthProvider} from './authentication';
import RequireAuth from './requireAuth'
import Header from './header';
import Settings from './settings/settings.js';

var routeObject =Settings.getRoutes();

var App = function ()  {
    var [component,setComponent] = useState('home')
    var header_color = "#d1b58f"

    if (component === "home"){
      header_color="transparent"
    }
    return (
      <AuthProvider>
      <div className="App">
         <Header header_color={header_color} component={component} setComponent={setComponent} />
        <div className="boxContainer">
        <Routes>
        {Object.keys(routeObject).map((key,index)=>{
          var r = routeObject[key]
        var count = (r.path.match(/\//g) || []).length;
          if (count>1){
            var nestesdroutes = r.path.split("/")
            nestesdroutes.splice(0,1);
            return (  <Route key={index} path={nestesdroutes[0]}> <Route path={nestesdroutes[1]} element={<RequireAuth setComponent={setComponent} isPublic={r.isPublic}>{r.component}</RequireAuth>} /> </Route>)
          } else {
            return (  <Route key={index} path={r.path} element={<RequireAuth setComponent={setComponent} isPublic={r.isPublic}> <div className="wrapperPage">{r.component}</div></RequireAuth>} />)
          }
        })}

      </Routes>
      </div>

      </div>
      </AuthProvider>

    );
  }



export default App;

import React from 'react';
import RequireAuth from '../../src/utility_components/requireAuth'
import { Routes, Route,Outlet} from "react-router-dom";

var  MakeRoutes  = (routeObject,setComponent)=>{
  var mappedRoutes =  Object.keys(routeObject).map((key,index)=>{
     var r = routeObject[key]

     if (r.hasOwnProperty("routes")){
      var redirect = null
      return (<Route key={index} path={r.path} label={r.label} element={<div className="outlet_wrapper">{r.component}<Outlet /></div>} accessibleTo={r.accessibleTo}   >
       {
         Object.keys(r.routes).map((k,index)=>{
           var route= r.routes[k]
           return( <Route key={index} path={route.path} element={<RequireAuth setComponent={setComponent} accessibleTo={route.accessibleTo}> <div className="wrapperPage">{route.component}</div></RequireAuth>} />)
        })
       }
     </Route>)
     } else{
       return <Route label={r.label} key={index} path={r.path} element={<RequireAuth setComponent={setComponent} accessibleTo={r.accessibleTo}> <div className="wrapperPage">{r.component}</div></RequireAuth>} />
     }
     })
     return mappedRoutes
   }

   export default MakeRoutes
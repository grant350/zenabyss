
import {React,useEffect} from 'react'
import {useLocation ,Navigate} from "react-router-dom";
import {UseAuth} from './authentication';
import Settings from '../app_settings/settings.js';


function RequireAuth(props) {
  var routeObject =Settings.getRoutes();

  var children = props.children
  var location = useLocation();
  let auth = UseAuth();
  useEffect(() => {
    Object.keys(routeObject).forEach(key=>{
      var obj= routeObject[key]
      var name=key
      if (location.pathname ===  obj.path) {
        props.setComponent(name);
      }
    })
  });
  if (!auth.isLoggedin && !props.isPublic) {
    return <Navigate to="/login" state={{ from: location,isLoggedin:auth.isLoggedin }} replace={true} />;
  } else {
  return children;
  }
}

export default RequireAuth
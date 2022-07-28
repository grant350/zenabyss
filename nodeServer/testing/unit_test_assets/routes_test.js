import React from 'react';

var Normal_route_component = function(props){
  return (<div className="normal-component">{props.label}</div>)
}

var Nested_route_component1 = function(props){
  return (<div className="normal-component">{props.label}</div>)
}
var Nested_route_component2 = function(props){
  return (<div className="normal-component">{props.label}</div>)
}

var Dashboard = function(props){

 return ( <div className="page">

  </div>
 )
}

var routeObject = {
 "normal": {"path":'/', "makeTab":true, "label":"home","accessibleTo":["all"],"component":<Normal_route_component/>},
 "nested": {
  "path":'/dashboard',
  "makeTab":true,
  "label":"dashboard",
  "component": <Dashboard />,
  "routes": {
     "route1": {"path":'route1', "label":"component1","accessibleTo":["admin","user"], "component": <Nested_route_component1 /> } ,
     "route2": {"path":'route2', "label":"component2",",accessibleTo":["admin","user"], "component":<Nested_route_component2/>}
   }
  }
}

export default routeObject;
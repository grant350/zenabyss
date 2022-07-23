import React from 'react';

const Frame = function (props){

return (
  <div className="frame-ct">
    <span className="bold center" style={{display:'block',width:'100%'}} > {props.text}</span>
   <iframe src={props.url}  title="resume" style={{width:'80%', height:'500px'}}  >
   </iframe>
  </div>
  );

}
export default Frame;
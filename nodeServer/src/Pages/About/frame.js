import React from 'react';

const Frame = function (props){

return (
  <div className="frame-ct">
    <span className="bold center" style={{display:'block',width:'100%'}} > {props.text}</span>
    {/* <object style={{width:'80%', height:'500px'}} data={props.url} type="application/pdf">
     <embed src={props.url} type="application/pdf" />
   </object> */}
   <iframe src='/Resume.pdf'  style={{width:'80%', height:'500px'}}  >
   </iframe>

  </div>

  );


}
export default Frame;
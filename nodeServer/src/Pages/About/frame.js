import { React } from 'react';

const Frame = function (props){




return (

  <div className="frame-ct">
    <span className="bold center" style={{display:'block',width:'100%'}} > {props.text}</span>
      <object data={props.url} type="application/pdf"  style={{width:'80%', height:'500px'}}>
        <embed src={props.url} type="application/pdf" />
      </object>
  </div>
  );

}
export default Frame;
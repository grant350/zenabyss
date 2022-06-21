import React from 'react';
import ReactDOM from 'react-dom/client';

class X extends React.Component {

  constructor(props){
    super(props)
  }


  render(){
    return (<div className="someclass"></div>)
  }

}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
export default X;

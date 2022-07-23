import React from 'react';
import BackgroundImage from './backgroundImage';
import './homepage.scss'
import X from '../class'
function HomePage(props){
  return (
  <div className="homepage" style={{ marginTop: "-50px"}} >
    <BackgroundImage />
    <X></X>
    </div>




  );
}

export default HomePage;
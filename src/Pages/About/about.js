import React from 'react';
import './about.scss';
import BackgroundTop from './BackgroundTop';
import ProfileImage from './ProfileImage'
import ProfileDescription from './ProfileDescription'
import '../../global.scss';

const About = function (props){


return (
  <div className="about">
    <BackgroundTop></BackgroundTop>
    <div className="profile_info center">

      <ProfileImage></ProfileImage>
      <ProfileDescription></ProfileDescription>
    </div>
    the about page
  </div>);


}
export default About;
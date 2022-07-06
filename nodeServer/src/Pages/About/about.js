import {React} from 'react';
import './about.scss';
import BackgroundTop from './BackgroundTop';
import ProfileImage from './ProfileImage'
import ProfileDescription from './ProfileDescription'
import '../../global.scss';
import Frame from './frame'

const About = function (props){




return (
  <div className="about">
    <BackgroundTop></BackgroundTop>
    <div className="profile_info center">

      <ProfileImage></ProfileImage>
      <ProfileDescription></ProfileDescription>
  <Frame url={'/Grant_Mitchell_Resume_1.2.pdf'} text={'My resume'}></Frame>
    </div>
  </div>);


}
export default About;

import {React,useState,useEffect} from 'react';
import './about.scss';
import BackgroundTop from './BackgroundTop';
import ProfileImage from './ProfileImage'
import ProfileDescription from './ProfileDescription'
// import '../../global.scss';
import Frame from './frame'

const About = function (props){
  var path = "/images/Resume.pdf"
  var ww= window.innerWidth

  const [url, setURL] = useState(path+"#zoom=100#toolbar=1")

    var checkWidth = (window_width)=>{
      if (window_width <= 350){
        setURL(path+"#zoom=30#toolbar=1")
      }
      if (window_width <= 550 && window_width > 350){
        setURL(path+"#zoom=45#toolbar=1")
      }
      if (window_width <= 700 && window_width > 550){
        setURL(path+"#zoom=60#toolbar=1")
      }
      if ( window_width > 700 && window_width <= 900){
        setURL(path+"#zoom=70#toolbar=1")
      }
      if (window_width > 900 && window_width < 1200){
        setURL(path+"#zoom=80#toolbar=1")
      }
      if (window_width > 1200){
        setURL(path+"#zoom=100#toolbar=1")
      }
    }

    useEffect(() => {

      checkWidth(ww)

       var handler = (e) =>{
        var window_width = e.target.innerWidth
        checkWidth(window_width)
      }
      window.addEventListener('resize',handler);

      return () => window.removeEventListener('resize', handler);
    });

return (
  <div className="about">
    <BackgroundTop></BackgroundTop>
    <div className="profile_info center">
      <ProfileImage></ProfileImage>
      <ProfileDescription></ProfileDescription>
  <Frame key={url}  url={url} text={'My resume'}></Frame>
    </div>
  </div>);

}
export default About;

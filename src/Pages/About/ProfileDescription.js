import React from 'react';
import '../../global.scss';


const ProfileDescription = function (props){


return (
  <div className="profile-description" style={{padding:'20px'}}>
      <p style={{textAlign:'left',display:'inline-block'}}><span className="bold" style={{textAlign:'left',display:'inline-block',margin:'0 10px'}}>Skills:  </span> <p className='skill-content'>Node.js, Javascript, React, Angular, Github,Git,DockerHub,Docker, Babel, Jest,Express.js,Bash,AWS EC2, Google App Engine, MongoDB, MySQL, SQL Server, EngineX, NPM, Loader.IO, New Relic</p></p>
      <p style={{textAlign:'left',display:'inline-block'}}><span className="bold" style={{textAlign:'left',display:'inline-block',margin:'0 10px'}}>How this site was built?:  </span> <p className='skill-content'>This site was built using Node.js to serve client pages. React to render components to the dom. MongoDB to store information as documents. </p></p>

</div>

    );
}
export default ProfileDescription;
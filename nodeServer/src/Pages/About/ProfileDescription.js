import React from 'react';
// import '../../global.scss';
const ProfileDescription = function (props){


return (
  <div className="profile-description" style={{padding:'20px'}}>
      <div style={{textAlign:'left',display:'inline-block'}}><span className="bold" style={{textAlign:'left',display:'inline-block',margin:'0 10px'}}>Skills:  </span> <p className='skill-content'>Node.js, Javascript, React, Angular, Github,Git,DockerHub,Docker, Babel, Jest,Express.js,Bash,AWS EC2, Google App Engine, MongoDB, MySQL, SQL Server, EngineX, NPM, Loader.IO, New Relic</p></div>
      <div style={{textAlign:'left',display:'inline-block'}}><span className="bold" style={{textAlign:'left',display:'inline-block',margin:'0 10px'}}>How this site was built?:  </span> <p className='skill-content'>This site was built using Node.js to serve client pages. React to render components to the dom. MongoDB to store information as documents. Also dockerized python server and node server to better control the applications at large scales. Used github actions to automate deployment and to prevent errors in deployment. Used aws ssm manager to keep ec2 instances secure, the less ports open the less chance hackers can get in :&#41;. Used Nginx to serve ssl certificate to server which redirects from http to https.  </p></div>
</div>
    );
}
export default ProfileDescription;
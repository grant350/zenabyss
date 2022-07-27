import React from 'react';
import {Avatar} from '@mui/material'
// import '../../global.scss';

const ProfileImage = function (props){
return (
  <div className="profile-column">
<Avatar
  alt="Remy Sharp"
  src="/images/profile.jpg"
  sx={{ width: 200, height: 200, objectPosition: 'left top'}}
/>
  <p className="bold center" style={{padding:'3px'}}>Professional Software Engineer</p>
</div>

    );
}
export default ProfileImage;
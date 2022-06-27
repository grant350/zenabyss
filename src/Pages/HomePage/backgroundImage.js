import React from 'react';
import { Button } from '@mui/material';
import { useNavigate,useLocation} from "react-router-dom";

function BackgroundImage(props){
  let navigate = useNavigate();
  function signup(){
    navigate('/signup',{replace:true})

  }
  return (
  <div className="background-image" >
    <div className="blackness">

        <div className="get-started">
                <span> Join The future of technology. </span>
            <Button onClick={signup} className="black-white-btn"> Join </Button>
        </div>
    </div>
    </div>
  );
}

export default BackgroundImage;
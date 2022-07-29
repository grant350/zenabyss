
import React from 'react';
import {Box} from '@mui/material';
import {useNavigate} from "react-router-dom";
import './dashboard.scss';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import CreateIcon from '@mui/icons-material/Create';
import Settings from '../../app_settings/settings'

export default function Catagories() {
  let navigate = useNavigate()
  var sub_routes = Settings.getSubRoutes("dashboard")

  var itemData = Object.keys(sub_routes).map(k=>{
    var item = sub_routes[k]
    return item
 })
 itemData = itemData.slice(1)
  return (
    <Box className="catagories" sx={{ flexGrow: 1 }}>
      {itemData.map((item,index)=>{
            return (<div key={index} onClick={(e)=>{navigate('/dashboard/'+item.path)}} className="grid-item">
               <item.icon className="icon"/>
                <span>{item.label}</span> </div>)
      })}
     </Box>
  );

}

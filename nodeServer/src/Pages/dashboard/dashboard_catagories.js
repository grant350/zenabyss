
import {React,useState,useEffect} from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Scaler from '../../utility_functions/site_scaler';
import {useNavigate} from "react-router-dom";
import './dashboard.scss';
// expand columns as width of page increases
export default function Catagories() {
  const [columns, setColumns] = useState(2)
  let navigate = useNavigate()

  useEffect(()=>{
    var arg1 = {"range":[0,600],"fn":()=>{
      setColumns(2)
    }}
    var arg2 = {"range":[601,900],"fn":()=>{
      setColumns(3)
    }}
    var arg3 = {"range":[901,1200],"fn":()=>{
      setColumns(4)
    }}
    Scaler(arg1,arg2,arg3)
    var Resize = ()=>{
      Scaler(arg1,arg2,arg3)
    }
    window.addEventListener('resize',Resize );
    return () => {
      window.removeEventListener('resize', Resize);
    }

  },[])


  return (
    <ImageList sx={{ width: "100%" }} cols={columns} rowHeight={"auto"}>
      {itemData.map((item) => {
        console.log('item.path',item.path)
       return( <ImageListItem  onClick={(e)=>{ navigate('/dashboard/'+item.path) }}  key={item.img}>
          <span className="catagory_overlay"> {item.title}</span>
          <div className="cover_overlay"  onClick={(e)=>{ navigate('/dashboard/'+item.path) }}></div>
          <img
            src={`${item.img}?w=200&h=200&fit=crop&auto=format`}
            srcSet={`${item.img}?w=200&h=200&fit=crop&auto=format&dpr=2 2x`}
            alt={item.title}
            loading="lazy"
          />
        </ImageListItem>)
      }
      )}
    </ImageList>
  );
}

const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Add A Product',
    path: 'add_product'
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Order',
    path: 'add_order'
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera',
    path: 'add_product'
  },
  {
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    title: 'Coffee',
    path: 'add_product'
  },
  {
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    title: 'Hats',
    path: 'add_product'
  }
];
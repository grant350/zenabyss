import './App.scss';
import {React,useState,useEffect} from 'react';
import {Tabs,Tab} from  '@mui/material';
import InsertForm from './insertForm';
import OrderForm from './orderForm';
import SearchForm from './searchForm';
import { Routes, Route, Link,useNavigate,useLocation ,Navigate,BrowserRouter} from "react-router-dom";
import About from './about';
import Login from './Pages/Login/login';
import Signup from './Pages/Signup/signup';
import Header from './header';
import HomePage from './Pages/HomePage/homepage';
import FourOFour from './Pages/FourOFour';
import {AuthProvider,UseAuth} from './authentication';

function RequireAuth(props) {
  // console.log('children',props);
  var children = props.children
  var location = useLocation();
  let auth = UseAuth();
  let navigate = useNavigate();

  useEffect(() => {
    if (!auth.isLoggedin && !props.isPublic) {
      props.setComponent('login');
    } else {
      switch (location.pathname){
        case "/about": props.setComponent('about');
        break;
        case "/insert/product":props.setComponent('product');
        break;
        case "/insert/order": props.setComponent('order');
        break;
        case "/login": props.setComponent('login');
        break;
        case "/signup": props.setComponent('login');
        break;
        case "/": props.setComponent('home');
        break;
        default:props.setComponent('home');
      }
    }
  });

  if (!auth.isLoggedin && !props.isPublic) {
    return <Navigate to="/login" state={{ from: location,isLoggedin:auth.isLoggedin }} replace />;
  } else {
  return children;
  }
}

var App = function ()  {

    var [component,setComponent] = useState('home')
    let navigate = useNavigate();
  var handleChange = (e, newValue)=> {
    // setComponent(newValue)
    switch (newValue){
      case "about": navigate('/about',{ replace: true });
      break;
      case "product": navigate('/insert/product',{ replace: true });
      break;
      case "order": navigate('/insert/order',{ replace: true });
      break;
      case "login": navigate('/login',{ replace: true });
      break;
      default: navigate('/',{ replace: true });
    }
  };



    return (

      <div className="App">
         <Header>
            <SearchForm />
        </Header>
        <div className="tab-ct">
        <Tabs  value={component} onChange={handleChange}>
          <Tab className="hovertab" label="home" value="home"  />
          <Tab className="hovertab" label="product"  value="product"/>
          <Tab className="hovertab" value="order" label="order"  />
          <Tab className="hovertab" value="about"  label="about"   />
          <Tab className="hovertab" value="login"    label="login" />
        </Tabs>
         </div>
         <AuthProvider>

        <div className="boxContainer">
        <Routes>
        <Route path="/" element={<RequireAuth setComponent={setComponent} isPublic={true}><HomePage /></RequireAuth>} />
        <Route exact path="/login" element={<RequireAuth setComponent={setComponent} isPublic={true}><Login /></RequireAuth>} />
        <Route exact  path="/about" element={<RequireAuth setComponent={setComponent} isPublic={true}><About /></RequireAuth>} />
        <Route exact  path="/signup" element={<RequireAuth setComponent={setComponent} isPublic={true}><Signup /></RequireAuth>} />


        <Route path="/insert"  >
          <Route path="order" element={<RequireAuth setComponent={setComponent} isPublic={false}><OrderForm /></RequireAuth>} />
          <Route path="product"   element={<RequireAuth setComponent={setComponent} isPublic={false}><InsertForm  /></RequireAuth>} />
        </Route>

      </Routes>

      </div>
      </AuthProvider>




      </div>
    );
  }



export default App;

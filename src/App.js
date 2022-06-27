import './App.scss';
import {React,useState,useEffect} from 'react';
import {Tabs,Tab} from  '@mui/material';
import InsertForm from './insertForm';
import OrderForm from './orderForm';
import SearchForm from './searchForm';
import { Routes, Route, Link,useNavigate,useLocation ,Navigate,BrowserRouter} from "react-router-dom";
import Login from './Pages/Login/login';
import Signup from './Pages/Signup/signup';
import Header from './header';
import HomePage from './Pages/HomePage/homepage';
import {AuthProvider,UseAuth} from './authentication';
import About from './Pages/About/about.js';
import Contact from './Pages/Contact/contact.js';

function RequireAuth(props) {
  var children = props.children
  var location = useLocation();
  let auth = UseAuth();
  let navigate = useNavigate();

  useEffect(() => {
      switch (location.pathname){
        case "/about": props.setComponent('about');
        break;
        case "/insert/product":props.setComponent('product');
        break;
        case "/insert/order": props.setComponent('order');
        break;
        case "/": props.setComponent('home');
        break;
        case "/login": props.setComponent(false);
        break;
        case "/contact": props.setComponent('contact');
        break;
        default:props.setComponent('home');
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
    switch (newValue){
      case "about": navigate('/about',{ replace: true });
      break;
      case "product": navigate('/insert/product',{ replace: true });
      break;
      case "order": navigate('/insert/order',{ replace: true });
      break;
      case "home": navigate('/',{ replace: true });
      break;
      case "contact": navigate('/contact',{ replace: true });
      break;
      default: navigate('/',{ replace: true });
    }
  };



    return (
      <AuthProvider>

      <div className="App">
         <Header>
            <SearchForm />
        </Header>
        <div className="tab-ct">
        <Tabs  value={component ?? false} onChange={handleChange}>
          <Tab className="hovertab" label="home" value={"home"}  />
          <Tab className="hovertab" label="product"  value="product"/>
          <Tab className="hovertab" value="order" label="order"  />
          <Tab className="hovertab" value="about"  label="about"   />
          <Tab className="hovertab" value="contact"  label="contact"   />

        </Tabs>
         </div>

        <div className="boxContainer">
        <Routes>
        <Route path="/" element={<RequireAuth setComponent={setComponent} isPublic={true}><HomePage /></RequireAuth>} />
        <Route exact path="/login" element={<RequireAuth setComponent={setComponent} isPublic={true}><Login /></RequireAuth>} />
        <Route exact  path="/about" element={<RequireAuth setComponent={setComponent} isPublic={true}><About /></RequireAuth>} />
        <Route exact  path="/signup" element={<RequireAuth setComponent={setComponent} isPublic={true}><Signup /></RequireAuth>} />
        <Route exact  path="/contact" element={<RequireAuth setComponent={setComponent} isPublic={true}><Contact /></RequireAuth>} />


        <Route path="/insert"  >
          <Route path="order" element={<RequireAuth setComponent={setComponent} isPublic={false}><OrderForm /></RequireAuth>} />
          <Route path="product"   element={<RequireAuth setComponent={setComponent} isPublic={false}><InsertForm  /></RequireAuth>} />
        </Route>

      </Routes>

      </div>




      </div>
      </AuthProvider>

    );
  }



export default App;

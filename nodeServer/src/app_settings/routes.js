import About from '../Pages/About/about.js';
import Contact from '../Pages/Contact/contact.js';
import InsertForm from '../Pages/dashboard/sub_pages/product_page/insertForm';
import OrderForm from '../Pages/dashboard/sub_pages/order_page/orderForm';
// import SearchForm from '../searchForm';
import Dashboard from '../Pages/dashboard/dashboard'
import HomePage from '../Pages/HomePage/homepage';

//tab bar routes

var routeObject = {
 "home": {"path":'/',"name":"home", "makeTab":true, "set":true,"label":"home","isPublic":true,"component":<HomePage/>},
 "about": {"path":'/about', "makeTab":true, "name":"about","set":false,"label":"about","isPublic":true,"component":<About/>},
 "contact": {"path":'/contact',"name":"contact", "makeTab":true, "set":false,"label":"contact","isPublic":true,"component":<Contact/>},
 "dashboard": {"path":'/dashboard', "makeTab":true, "name":"product","set":false,"label":"dashboard","isPublic":true,"component":<Dashboard />},
 "product": {"path":'/dashboard/add_product', "makeTab":false, "name":"product","set":false,"label":"upload product","isPublic":true,"component": <Dashboard component={<InsertForm /> } /> } ,
 "order": {"path":'/dashboard/order', "makeTab":false, "name":"order","set":false,"label":"create order","isPublic":true,"component":<OrderForm/>}
}


// other routes

// {

// "dashboard": {


// }

// }
export default routeObject;
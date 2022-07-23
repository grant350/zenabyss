import About from '../Pages/About/about.js';
import Contact from '../Pages/Contact/contact.js';
import InsertForm from '../insertForm';
import OrderForm from '../orderForm';
// import SearchForm from '../searchForm';
import HomePage from '../Pages/HomePage/homepage';

var routeObject = {
 "home": {"path":'/',"name":"home", "makeTab":true, "set":true,"label":"home","isPublic":true,"component":<HomePage/>},
 "about": {"path":'/about', "makeTab":true, "name":"about","set":false,"label":"about","isPublic":true,"component":<About/>},
 "contact": {"path":'/contact',"name":"contact", "makeTab":true, "set":false,"label":"contact","isPublic":true,"component":<Contact/>},
 "product": {"path":'/private/product', "makeTab":true, "name":"product","set":false,"label":"upload product","isPublic":false,"component":<InsertForm />},
 "order": {"path":'/private/order', "makeTab":true, "name":"order","set":false,"label":"create order","isPublic":false,"component":<OrderForm/>}
}
export default routeObject;
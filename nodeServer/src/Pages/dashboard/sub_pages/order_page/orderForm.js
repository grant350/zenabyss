// import './App.scss';
import React from 'react';
import {
  FormGroup
} from '@zenabyss/reactformbuilder';
import {
  Box,
  Button
} from '@mui/material';
import Selector from './selectorComponent'
import axios from 'axios'
import {getCookie} from '../../../../utility_functions/cookie'

class OrderForm extends React.Component {
    constructor(props) {
      super(props)
      this.state = {}
      this.myRef = React.createRef();
      this.submit = this.submit.bind(this);
      this.states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hamsphire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming']
    }




    submit() {

      var formvalue = this.myRef.current.getData();
      console.log('formv', formvalue)
      axios.post('/insertOrder', formvalue,{headers:{Authorization:"Bearer "+getCookie('user_session')},params:{user_id:getCookie('user_id')}}).then(response => {
        console.log('response', response)
        this.myRef.current.reset();
      }).catch(err => {
        console.log(err);
      })

      // "image":{
      //   "type":"formControl",
      //   "label":"image",
      //   "JSXElement":ImageInput,
      //   "errorMessage":"please upload valid image",
      //   "helperMessage":"upload image",
      //   "required":true,
      //   "disabled":false,
      //   "className":"image-element",
      //   "valueType":"Object"
      // },
    }


    //gonna clean up some code here.
    render() {
      var formgroup = {
        "customer_name": {
          "type": "formControl",
          "label": "name",
          "validator": (value, obs) => {
            if (value.length !== 0) {
              obs.next(true)
            } else {
              obs.next(false)
            }
          },
          "errorMessage":"fill out"
        },
        "customer_street": {
          "type": "formControl",
          "label": "street address"
        },
        "state": {
          "type": "formControl",
          "JSXElement": Selector,
          "dataInject": this.states,
          "label": "state"
        },
        "city": {
          "type": "formControl",
          "label": "city"
        },
        "tax": {
          "type": "formControl",
          "label": "tax",
          "validator": (val, obs) => {
            var countDecimals = function (v) {
              if (v.length >= 1) {
                var split = v.split('.')
                if (split.length >= 2) {
                  return v.split(".")[1].length || 0;
                } else {
                  return 0;
                }
              } else {
                return 0
              }
            }
            if (countDecimals(val) === 2) {
              obs.next(true);
            } else {
              obs.next(false);
            }
          }
          // "required":true
        },
        "tracking": {
          "type": "formControl",
          "label": "tracking",
          "validator": (val, obs) => {
            if (isNaN(val) === false && val.length > 7) {
              obs.next(true);
            } else {
              obs.next(false)
            }
          }
        },

        "shipping_cost": {
          "type": "formControl",
          "label": "shipping cost",
          "validator": (val, obs) => {
            var countDecimals = function (v) {
              if (v.length >= 1) {
                var split = v.split('.')
                if (split.length >= 2) {
                  return v.split(".")[1].length || 0;
                } else {
                  return 0;
                }
              } else {
                return 0
              }
            }
            if (countDecimals(val) === 2) {
              obs.next(true);
            } else {
              obs.next(false);
            }
          }
        },
        "products": {
          "type": "formArray",
          "controls": [{
            "name": "product",
            "type": "formGroup",
            "controls": {
              "model": {
                "type": "formControl",
                "label": "model"
              },
              "product_cost": {
                "type": "formControl",
                "label": "product cost",
                "validator": (val, obs) => {
                  var countDecimals = function (v) {
                    if (v.length >= 1) {
                      var split = v.split('.')
                      if (split.length >= 2) {
                        return v.split(".")[1].length || 0;
                      } else {
                        return 0;
                      }
                    } else {
                      return 0
                    }
                  }
                  if (countDecimals(val) === 2) {
                    obs.next(true);
                  } else {
                    obs.next(false);
                  }
                }
              },
              "upc": {
                "type": "formControl",
                "label": "upc",
                "validator": (value, obs) => {
                  if (value.length === 12) {


                    axios.get('/searchProducts', {
                      params: {
                        query: value
                      }
                    }).then(response => {
                      if (response.data.data.length === 1) {
                        obs.next(true);
                      } else {
                        obs.next(false);
                      }
                    })
                  } else {
                    obs.next(false)
                  }
                }
              },
              "quantity": {
                "type": "formControl",
                "label": "quantity",
                "validator": (value, obs) => {
                  if (isNaN(parseInt(value)) === false) {
                    obs.next(true)
                  } else {
                    obs.next(false)
                  }
                }
              }
            }
          }]
        }


      }

      return ( < Box className = "insertBox"
        sx = {
          {
            width: '50%',
            backgroundColor: 'white'
          }
        } > < FormGroup ref = {
          this.myRef
        }
        controls = {
          formgroup
        }
        name = {
          'order'
        }
        /> <Button className="btn" style={{ 'color': 'white', 'margin': "20px" }} onClick={this.submit}>Submit</Button > < /Box>);


        // <Box  className="insertBox" sx={{width: 600, height: 900, backgroundColor: 'primary.dark'}} >
        // <div className="wrapper" ><TextField  id="outlined-basic" onChange={(e)=>{this.inputChange(e.target.value,"item_upc")}}  label="Item UPC" variant="outlined" /></div>
        // <div className="wrapper" ><TextField  id="outlined-basic"  onChange={(e)=>{this.inputChange(e.target.value,"quantity")}} label="Quantity" variant="outlined" /></div>
        // <div className="wrapper" ><TextField  id="outlined-basic"  onChange={(e)=>{this.inputChange(e.target.value,"customer_name")}} label="Customer Name" variant="outlined" /></div>
        // <div className="wrapper" ><TextField  id="outlined-basic"  onChange={(e)=>{this.inputChange(e.target.value,"customer_address")}} label="Customer Address" variant="outlined" /></div>
        // <div className="wrapper" ><TextField  id="outlined-basic"  onChange={(e)=>{this.inputChange(e.target.value,"shipping_code")}} label="Shipping Code" variant="outlined" /></div>
        // <div className="wrapper" ><TextField  id="outlined-basic"  onChange={(e)=>{this.inputChange(e.target.value,"item_sku")}} label="Item_SKU" variant="outlined" /></div>
        // <div className="wrapper" ><TextField  id="outlined-basic"  onChange={(e)=>{this.inputChange(e.target.value,"label_cost")}} label="Label Cost" variant="outlined" /></div>
        // <div className="submit-container"><Button className=" btn" onClick={this.submit}>SUBMIT</Button></div>
        // </Box>
        // eslint-disable-next-line

      }






    }
    export default OrderForm;
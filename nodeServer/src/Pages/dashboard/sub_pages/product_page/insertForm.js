import '../../../../App.scss';
import React from 'react';
import {Box,FormControlLabel,FormLabel,Radio,FormControl,RadioGroup,TextField,Button} from  '@mui/material';
import axios from 'axios';
import AddSub from '../../../../utility_components/addsub'
import {getCookie} from '../../../../utility_functions/cookie';
import './product.scss'
class InsertForm extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      upc:"",
      image:"",
      brand:"",
      model:"",
      quantity:0,
      retail_price:0,
      product_cost:0,
      title:"",
      fees:0,
      BIN:"",
      platform:"",
      active:true,
      showUpdateBar:false
    }
    this.inputChange = this.inputChange.bind(this)
    this.submit = this.submit.bind(this);
    this.onImageChange = this.onImageChange.bind(this);
    this.handleIncrement = this.handleIncrement.bind(this);
    this.handleDecrement = this.handleDecrement.bind(this);
    this.changeQTY = this.changeQTY.bind(this);
    this.pullFromUPC = this.pullFromUPC.bind(this);
    this.showUpdate = this.showUpdate.bind(this);
  };


  inputChange(value,name){
    if (name !== 'upc'){
      if (typeof parseFloat(value) === "number" &&  (isNaN(value)) === false ){
        if (value.includes('.') === false){
          if (isNaN(parseFloat(value)) === false){
            value = parseFloat(value)
          }
        }
      }
      if (value === "false"){
        value = false;
      }
      if (value === "true") {
        value = true
      }
   }
    this.setState({[name]:value},()=>{
      console.log(this.state)
      if (name === 'upc'){
        this.pullFromUPC()
      }
    })
  }



   onImageChange = e => {
     const file = (e.target).files[0]
     if (file){
     const reader = new FileReader();
     reader.readAsDataURL(file)
     reader.onload = (e) => {
       var img = new Image();
       img.src = e.target.result;
       img.onload = ()=> {
         var ob = { "64bit": reader.result,  "image_structure": { "width": img.width, "height": img.height, "filename": file.name, "filesize": file.size, "filetype": file.type } }
          this.setState({image:ob});
        }
      }
    }
    };


    showUpdate(data){

      setTimeout(()=>{
        this.setState({showUpdateBar:true,updateBarUPC:data.upc})
      },5000)
      setTimeout(()=>{
        this.setState({showUpdateBar:false,updateBarUPC:data.upc})
      },10000)
    }

   // replace and find with {7877:"maybelline", 7874: "covergirl"}
   //begins with upc
    pullFromUPC(e){
      if (this.state.upc.length === 12){

        axios.get('/searchProducts',{params:{query:this.state.upc,user_id:getCookie('user_id')},headers:{Authorization:"Bearer "+getCookie('user_session')} }).then(response=>{

        if (response.data === 'updated'){
          // have a  timer updated
          this.showUpdate();
        }


        if (response.data.data[0]){
         this.setState({
          active: response.data.data[0].active,
          brand: response.data.data[0].brand,
          fees: response.data.data[0].fees,
          image: {'64bit':response.data.data[0].image},
          model:  response.data.data[0].model,
          platform: response.data.data[0].platform,
          product_cost:  response.data.data[0].product_cost,
          quantity: response.data.data[0].quantity,
          retail_price: response.data.data[0].retail_price,
          title: response.data.data[0].title

         })
        } else {
          this.setState({
            image:{},
            model:"",
            quantity:0,
            retail_price:0,
            fees:0,
            BIN:"",
            title:"",
            active:true
            });
        }
        })
      }

     }
   submit(e){
    //check if can submit
    var bool = this.state.quantity >= 0;
    if (!bool) {
      console.log('your quantity is less than 0')
    }
    var bool2 = this.state.product_cost > 0;
    if (!bool2) {
      console.log('your cost is less than 0')
    }
    var bool1 = this.state.retail_price > 0;
    if (!bool1) {
      console.log('your retail is less than  0')
    }
    var bool3 = this.state.upc.length === 12;
    if (!bool3) {
    }
    var bool4 = this.state.brand.length > 2;
    if (!bool4) {
    }

    var bool6 = typeof this.state.upc === "string";
    if (!bool6) {
    }

      if (bool && bool2 && bool3 && bool4  && bool1 && bool6) {
        var copystate = Object.assign({},this.state);
        delete copystate['showUpdateBar']
        delete copystate['updateBarUPC']
        axios.post('/insertProduct',copystate,{ headers:{Authorization:"Bearer "+getCookie('user_session')},params:{user_id:getCookie('user_id')} }).then(response=>{
            console.log('response',response)
            this.setState({
          upc:"",
          image:{},
          model:"",
          quantity:0,
          retail_price:0,
          brand:"",
          fees:0,
          BIN:"",
          title:"",
          active:true
          });
        }).catch(err=>{
          console.log('switching page')
          console.log(err);
        })
      } else {
        console.log('invalid')
      }
   }

   changeQTY(e){
     var val=0;
     if (e.target.value >=0){
      val = e.target.value
     }
     console.log(val)

    this.setState({quantity:val})
   }

   handleIncrement () {
    var val = this.state.quantity+1;
    console.log('increment val',val)
      this.setState({quantity:val})
  };

  handleDecrement ()  {
    var val = this.state.quantity-1;
    if (val < 0){
     val =0;
    }
      this.setState({quantity:val})
  };

  //gonna clean up some code here.
   render(){
    return (
    <React.Fragment> <h1>Add product</h1>
    <Box   className="insertBox" sx={{ height: "auto", backgroundColor:'transparent'}} >
    <div className="wrapper" style={{"display":"block","width":"100%"}}><TextField  id="outlined-basic"  onChange={(e)=>{this.inputChange(e.target.value,"upc")}} value={this.state.upc} label="UPC" variant="outlined" /></div>
    <div className="wrapper" ><TextField  id="outlined-basic" onChange={(e)=>{this.inputChange(e.target.value,"title")}} value={this.state.title}  label="title" variant="outlined" /></div>

    <div className="wrapper">
        <img alt={this.state.image.filename} style={{width:"50px", height:"50px"}} src={this.state.image['64bit']} />
        <input type="file" name="myImage" onChange={this.onImageChange} />
      </div>
    <div className="wrapper"><TextField  id="outlined-basic"  onChange={(e)=>{this.inputChange(e.target.value,"brand")}} label="BRAND" variant="outlined" value={this.state.brand}  /></div>
    <div className="wrapper" ><TextField  id="outlined-basic"  onChange={(e)=>{this.inputChange(e.target.value,"model")}} label="MODEL" variant="outlined" value={this.state.model}  /></div>

    <AddSub className="addsub" handleDecrement={this.handleDecrement} handleIncrement={this.handleIncrement} changeQTY={this.changeQTY} qty={this.state.quantity} />

    <div className="wrapper" ><TextField  id="outlined-basic"  onChange={(e)=>{this.inputChange(e.target.value,"retail_price")}} label="RetailPrice" value={this.state.retail_price} variant="outlined" /></div>
    <div className="wrapper" ><TextField  id="outlined-basic"  onChange={(e)=>{this.inputChange(e.target.value,"product_cost")}} label="ProductCost"  value={this.state.product_cost} variant="outlined" /></div>
    <div className="wrapper" ><TextField  id="outlined-basic" onChange={(e)=>{this.inputChange(e.target.value,"fees")}}  label="Fees" variant="outlined" value={this.state.fees} /></div>
    <div className="wrapper" ><TextField  id="outlined-basic" onChange={(e)=>{this.inputChange(e.target.value,"BIN")}} value={this.state.BIN}  label="BIN" variant="outlined" /></div>

    <div className="wrapper" ><TextField  id="outlined-basic" onChange={(e)=>{this.inputChange(e.target.value,"platform")}} value={this.state.platform}   label="Platform" variant="outlined" /></div>
    <FormControl className="wrapper">
        <FormLabel id="demo-radio-buttons-group-label">active</FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="true"
          name="radio-buttons-group"
          onChange={(e)=>{this.inputChange(e.target.value,"active")}}
        >
          <FormControlLabel value="true" control={<Radio />} label="true" />
          <FormControlLabel value="false" control={<Radio />} label="false" />
        </RadioGroup>
      </FormControl>
        <div className="submit-container"><Button className=" btn" onClick={ (e)=>{this.submit(e)}}>SUBMIT</Button></div>

    </Box></React.Fragment>)

   }






}
export default InsertForm;


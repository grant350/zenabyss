import React from "react";
import {ButtonGroup ,TextField,Button} from  '@mui/material';

class AddSub extends React.Component {


  render() {

    return (
      <div className="addsub">
      <label className="wrapper" style={{"display":"block","width":"100%"}}>Add Subtract Inventory</label>
      <ButtonGroup  className="buttongroup wrapper" size="small" aria-label="small outlined button group">
        <Button onClick={this.props.handleIncrement}>+</Button>
       <TextField className="qty-input" style={{width:"40px!important",height:"40px!important", padding: "0px!important"}} onChange={this.props.changeQTY} value={this.props.qty}>{this.props.qty}</TextField>
     <Button onClick={this.props.handleDecrement}>-</Button>
      </ButtonGroup>
      </div>
    );
  }
}

export default AddSub;
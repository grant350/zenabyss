import React from "react";
import {ButtonGroup ,TextField,Button} from  '@mui/material';

class AddSub extends React.Component {


  render() {

    return (
      <React.Fragment>
      <label className="wrapper" style={{"display":"block","width":"100%","color":"rgb(255, 247, 1)"}}>Add Subtract Inventory</label>
      <ButtonGroup  className="buttongroup wrapper" size="small" aria-label="small outlined button group">
        <Button onClick={this.props.handleIncrement}>+</Button>
       <TextField className="qty-input" style={{width:"40px",height:"40px!important", padding: "0px!important"}} onChange={this.props.changeQTY} value={this.props.qty}>{this.props.qty}</TextField>
     <Button onClick={this.props.handleDecrement}>-</Button>
      </ButtonGroup>
      </React.Fragment>
    );
  }
}

export default AddSub;
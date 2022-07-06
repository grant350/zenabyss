import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
function Selector(props) {

  const handleChange = (event) => {
    props.update(event.target.value);
  };

  const states = props.dataInject;
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">State</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={props.value}
          label="State"
          onChange={handleChange}
        >
          {states.map((item,k)=>{return (<MenuItem key={k} value={item}>{item}</MenuItem>)})}
        </Select>
      </FormControl>
    </Box>
  );
}
export default Selector;
import React from 'react';
import { FormControl, InputLabel, Input, InputAdornment, IconButton } from "@material-ui/core";
import { Add } from '@material-ui/icons';


export default function AddNew(props) {
  const { handleChange, addNewItem, newItem } = props;
  return (
    <FormControl>
      <InputLabel htmlFor="standard-adornment-password">Add new item</InputLabel>
      <Input
        id="standard-adornment-password"
        onChange={(e)=>{handleChange(e)}}
        value={newItem}
        endAdornment={
          <InputAdornment position="end">
            <IconButton onClick={addNewItem}>
              <Add />
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  )
}
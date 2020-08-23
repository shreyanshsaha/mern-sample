import React from 'react';
import ReactDOM from 'react-dom';
import List from '@material-ui/core/List';
import { Delete } from '@material-ui/icons';
import { ListItemIcon, ListItemText, ListItem, ListItemSecondaryAction, IconButton, makeStyles } from '@material-ui/core';
import Axios from 'axios';


export default function Item(props) {
  const { content, id, handleDelete } = props;
  
  return (
    <ListItem key={id}>
      <ListItemText primary={content} />
      <ListItemSecondaryAction >
        <IconButton onClick={()=>{handleDelete(id)}} edge="end">
          <Delete />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}
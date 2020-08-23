import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Axios from 'axios';
import Item from './component/item';
import { makeStyles, List, Divider } from '@material-ui/core';
import AddNew from './component/addNew';
import _ from 'lodash';

class App extends Component {
  constructor() {
    super();
    this.state = {
      items: [],
      newItem: "",
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);

  }

  handleDelete(id) {
    console.log(id);
    if (id !== undefined) {
      Axios.delete('/item/' + id)
        .then(() => {
          let items = this.state.items;
          _.remove(items, (e) => {
            return e._id === id;
          });
          this.setState({ items: items });

        })
    }
    return;
  }

  handleChange(e) {
    this.setState({ newItem: e.target.value });
  }

  handleSubmit() {
    console.log(this.state.newItem);
    if (this.state.newItem.length > 0) {
      Axios.post('/item', { content: this.state.newItem })
        .then((newItem) => {
          let items = this.state.items;
          items.push(newItem.data);
          this.setState({ items: items, newItem: "" });
        });
    }
    return;
  }

  componentDidMount() {
    Axios.get("/item").then((res) => {
      let data = res.data;
      this.setState({ items: data });
    });

  }

  render() {
    return (
      <div className="App">
        <div className="list">
          <List>
            {this.state.items.map((e) => {
              return (
                < Item key={e._id} content={e.content} id={e._id} handleDelete={this.handleDelete} />
              );
            })}
          </List>
          <AddNew handleChange={this.handleChange} addNewItem={this.handleSubmit} newItem={this.state.newItem} />
        </div>
      </div>
    );
  }
}

export default App;

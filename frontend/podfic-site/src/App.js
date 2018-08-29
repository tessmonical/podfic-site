import React, { Component } from "react";
import { Route } from "react-router-dom";
import { Provider } from 'react-redux'

import { Home } from "./views/Home";
import {store} from './store'

import "./App.css";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Route exact path="/" component={Home} />
      </Provider>
    );
  }
}

export default App;

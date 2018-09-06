import React, { Component } from "react";
import { Route } from "react-router-dom";
import { Provider } from "react-redux";
import { SubmitView } from "./views/SubmitView";
import { SinglePodficView } from "./views/SinglePodficView";
import { Home } from "./views/Home";
import { store } from "./store";

import "./App.css";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <Route exact path="/" component={Home} />
          <Route exact path="/podfic/:id" component={SinglePodficView} />
          <Route exact path="/submit" component={SubmitView} />
        </div>
      </Provider>
    );
  }
}

export default App;

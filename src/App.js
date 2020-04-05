import React, { Component } from "react";
import Connect from "./Connect/Connect";
import Chat from "./Chat/Chat";
import "./App.css";
import { Route, Switch } from "react-router-dom";

class App extends Component {
  componentDidMount() {}
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/chat/:name/:room" component={Chat} />
          <Route exact path="/" component={Connect} />
        </Switch>
      </div>
    );
  }
}

export default App;

import { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LandingPage from "../LandingPage/LandingPage";

class App extends Component {
  render() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={LandingPage}/>
      </Switch>
    </Router>
  );
  }
}

export default App;

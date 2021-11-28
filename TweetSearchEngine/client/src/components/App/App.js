import { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LandingPage from "../LandingPage/LandingPage";
import ResultsPage from "../ResultsPage/ResultsPage";

class App extends Component {
  render() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={LandingPage}/>
        <Route path="/results" component={ResultsPage} />
      </Switch>
    </Router>
  );
  }
}

export default App;

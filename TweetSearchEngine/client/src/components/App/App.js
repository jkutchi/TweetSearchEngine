import { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LandingPage from "../LandingPage/LandingPage";
import ResultsPage from "../ResultsPage/ResultsPage";
import SummaryPage from "../SummaryPage/SummaryPage";
import 'bootstrap/dist/css/bootstrap.min.css';
class App extends Component {
  render() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={LandingPage}/>
        <Route path="/results" component={ResultsPage}/>
        <Route path="/summary" component={SummaryPage}/>
      </Switch>
    </Router>
  );
  }
}

export default App;

import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Search from "./pages/Search";
import Saved from "./pages/Saved";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";

function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route exact path='/' component={Search}></Route>
          <Route exact path='/search' component={Search}></Route>
          <Route exact path='/saved' component={Saved}></Route>
          <Route component={NoMatch} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

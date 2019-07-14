// React
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// Toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Socket.io-client
import openSocket from 'socket.io-client';
// Components
import Search from "./pages/Search";
import Saved from "./pages/Saved";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";


const socket = openSocket();


class App extends React.Component {

  componentDidMount() {
    this.initSocket()
  }

  initSocket = () => {
    socket.on('book_saved', (msg) => {
      this.notify(msg);
    });
  }

  notify = (msg) => {
    toast(
      (<div>
        <p>'{msg.title}' just saved!</p>
      </div>)
    )
  };

  render() {
    return (
      <Router>
        <div>
          <Nav />
          <ToastContainer />
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
}

export default App;

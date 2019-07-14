import React from 'react';
// Toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Socket.io-client
import openSocket from 'socket.io-client';

const socket = openSocket({transports: ['polling']});


class ToastNotification extends React.Component {

  componentDidMount() {
    this.initSocket();
  }

  initSocket = () => {
    socket.on('book_save_server', (msg) => {
      console.log(msg)
      this.notify(msg.title);
    });
  }

  notify = (msg) => {
    toast(
      (<div>
        <p>'{msg}' just saved!</p>
      </div>)
    );
  }

  render() {
    return <ToastContainer></ToastContainer>
  }
}

export default ToastNotification;
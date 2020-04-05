import React, { Component } from "react";
import socketIOClient from "socket.io-client";

class Connect extends Component {
  state = {
    name: "",
    room: "",
  };
  establishConnection = () => {
    const params = { name: this.state.name, room: this.state.room };
    this.props.history.push(`/chat/${params.name}/${params.room}`);
  };
  changeHandler = (event) => {
    const target = event.target;
    const name = target.name;
    this.setState({
      [name]: target.value,
    });
  };
  render() {
    return (
      <div className="centered-form">
        <div className="centered-form__form">
          <div>
            <div className="form-field">
              <h3>Join a Chat</h3>
            </div>
            <div className="form-field">
              <label>Display name</label>
              <input
                type="text"
                name="name"
                value={this.state.name}
                onChange={this.changeHandler}
                autoFocus
                autoComplete="off"
              />
            </div>
            <div className="form-field">
              <label>Room Name</label>
              <input
                type="text"
                name="room"
                value={this.state.room}
                onChange={this.changeHandler}
                autoComplete="off"
              />
            </div>
            <div className="form-field">
              <button onClick={this.establishConnection}>Join</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Connect;

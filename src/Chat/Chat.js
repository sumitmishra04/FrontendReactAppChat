import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import moment from "moment";
class Chat extends Component {
  state = {
    adminMsg: "",
    users: [],
    userMessage: "",
    messageList: [],
    userTyping: "",
    socket: socketIOClient("https://arcane-sands-64993.herokuapp.com/"),
    // socket: socketIOClient("http://localhost:5000/"),
  };
  componentDidMount() {
    const socket = this.state.socket;
    const params = this.props.match.params;
    const self = this;
    socket.on("connect", () => {
      socket.emit("join", params, function (errors) {
        if (errors) {
          alert(errors);
          self.props.history.push("/");
        } else {
          // console.log("No error");
        }
      });
    });
    socket.on("newMessage", function (message) {
      // var formattedTime = moment(message.createdAt).format("h:mm a");
      var formattedTime = moment(message.createdAt).format("h:mm a");

      message.createdAt = formattedTime;
      const currMessageList = [...self.state.messageList];
      currMessageList.push(message);

      self.setState({
        messageList: currMessageList,
      });

      self.scrollToBottom();
    });
    socket.on("FromAPI", function (message) {
      self.setState({ adminMsg: message });
    });
    socket.on("disconnect", function () {
      console.log("disconnected");
    });
    socket.on("updateUserList", function (users) {
      self.setState({ users });
    });
  }

  sendMessage = () => {
    const self = this;
    const socket = this.state.socket;
    socket.emit(
      "createMessage",
      {
        text: this.state.userMessage,
      },
      function (data) {
        self.setState({ userMessage: "" });
      }
    );
  };

  changeHandler = (event) => {
    const target = event.target;
    const name = target.name;
    this.setState({
      [name]: target.value,
    });
  };

  scrollToBottom = () => {
    // selectors
    var messages = document.getElementById("messages");
    if (messages) {
      var newMessages = messages.lastChild;

      // // heights
      var clientHeight = messages.clientHeight;

      var scrollTop = messages.scrollTop;

      var scrollHeight = messages.scrollHeight;
      var newMessageHeight = window
        .getComputedStyle(newMessages, null)
        .getPropertyValue("height");

      var secondLastMessage = newMessages.lastChild.previousSibling;
      var lastMessageHeight = window
        .getComputedStyle(secondLastMessage, null)
        .getPropertyValue("height");

      const computedHeight =
        parseInt(clientHeight) +
        parseInt(scrollTop) +
        parseInt(newMessageHeight) +
        parseInt(lastMessageHeight);

      messages.scrollTop = scrollHeight;
    }
  };
  render() {
    const {
      messageList,
      users,
      adminMsg,
      userMessage,
      userTyping,
    } = this.state;
    return (
      <div>
        <div className="chat">
          <div className="chat__sidebar">
            <h3 className="">People</h3>
            {users.map((user, i) => (
              <li id="users" key={i}>
                {user}
              </li>
            ))}
          </div>
          <div className="chat__main">
            <h3>{adminMsg}</h3>
            <ol id="messages" className="chat__messages">
              {messageList.map((message, i) => (
                <li key={i} className="message">
                  <div className="message__title">
                    <h4>{message.from}</h4>
                    <span>{message.createdAt}</span>
                  </div>
                  <div className="message__body">
                    <p>{message.text}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="chat__footer">
              <span>{userTyping}</span>
              <div className="form" id="message-form">
                <input
                  type="text"
                  id="message"
                  name="userMessage"
                  placeholder="Type your message"
                  autoFocus
                  value={userMessage}
                  onChange={this.changeHandler}
                  autoComplete="off"
                />
                <button onClick={this.sendMessage}>Send</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Chat;

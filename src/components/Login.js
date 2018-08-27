import React, { Component } from "react";
import FieldGroup from "./FieldGroup";
import { Button, FormGroup, Alert } from "react-bootstrap";

const formStyle = {
  width: "350px",
  margin: "0 auto",
  border: "1px solid black",
  borderRadius: "5px",
  padding: "15px"
};

const submitBtnStyle = {
  textAlign: "center"
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }
  inputChanged = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  doLogin = e => {
    e.preventDefault();
    let loginInfo = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.doLogin(loginInfo);
  };
  render() {
    return (
      <div style={formStyle}>
        <form onSubmit={this.doLogin}>
          <FieldGroup
            type="email"
            name="email"
            label="Email"
            placeholder="Enter email..."
            value={this.state.email}
            onChange={e => this.inputChanged(e)}
          />
          <FieldGroup
            type="password"
            name="password"
            label="Password"
            placeholder="Enter password..."
            value={this.state.password}
            onChange={e => this.inputChanged(e)}
          />
          <FormGroup style={submitBtnStyle}>
            <Button type="submit" bsStyle="primary">
              Login
            </Button>
          </FormGroup>
          {this.props.alert.message !== '' ? 
            <Alert bsStyle={this.props.alert.type}>
              {this.props.alert.message}
            </Alert> : <div />}
        </form>
      </div>
    );
  }
}

export default Login;

import React from "react";
import "./login.css";
import { Container, Form, Button } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { Alert } from "react-bootstrap";
// import userService from "../../service/user-service";
// import { trackPromise } from "react-promise-tracker";
// import cookie from "react-cookies";

const LOGIN_SUCCESS = "login successful.";
const LOGIN_ERROR = "Please try again later.";

function passwordValidate(pass) {
  const strongRegex = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#/$%/^&/*])(?=.{8,})"
  );
  if (strongRegex.test(pass)) {
    return false;
  } else {
    return true;
  }
}

function validate(email, password) {
  const errors = [];

  if (email.length < 5) {
    errors.push("Email should be at least 5 charcters long");
  }
  if (email.split("").filter((x) => x === "@").length !== 1) {
    errors.push("Email should contain a @");
  }
  if (email.indexOf(".") === -1) {
    errors.push("Email should contain at least one dot");
  }

  if (password.length < 6 || passwordValidate(password)) {
    errors.push("Password should be at least 6 characters long");
  }

  return errors;
}

export default class LoginComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      hiddenPassword: true,
      loginSuccess: false,
      loginError: false,
    };
  }
  handleEmailChange = (event) => {
    this.setState({ email: event.target.value });
  };

  handlePasswordChange = (e) => {
    this.setState({ password: e.target.value });
  };

  submitLoginRequest = (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    const errors = validate(email, password);
    event.target.className += " was-validated";

    if (errors.length > 0) {
      console.log(errors);
      return;
    } else {
      console.log("snmadh");
      this.setState({
        loginError: false,
        loginSuccess: true,
      });
    }
  };

  togglePassword = (e) => {
    this.setState({ hiddenPassword: !this.state.hiddenPassword });
  };

  render() {
    const hideiconstyle = this.state.hiddenPassword ? { display: "none" } : {};
    const showiconstyle = !this.state.hiddenPassword ? { display: "none" } : {};

    if (this.state.loginSuccess)
      return (
        <Redirect
          to={{
            pathname: "/Home",
          }}
        />
      );
    return (
      <Container fluid>
        <Container>
          <form
            className="login-form"
            onSubmit={this.submitLoginRequest}
            noValidate
          >
            <Row>
              <Col>
                <h3>Sign In</h3>
                <br />
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group controlId="formLoginEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    required
                    value={this.state.email}
                    onChange={this.handleEmailChange}
                  />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                  <div className="invalid-feedback">
                    Please provide a valid email
                  </div>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group controlId="formLoginPassword">
                  <Form.Label>Password</Form.Label>
                  <InputGroup>
                    <Form.Control
                      placeholder="Password"
                      type={this.state.hiddenPassword ? "password" : "text"}
                      pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                      value={this.state.password}
                      onChange={this.handlePasswordChange}
                      required
                    />
                    <InputGroup.Append>
                      <InputGroup.Text
                        onClick={this.togglePassword}
                        style={showiconstyle}
                      >
                        <i className="fa fa-eye" aria-hidden="true"></i>
                      </InputGroup.Text>
                      <InputGroup.Text
                        onClick={this.togglePassword}
                        style={hideiconstyle}
                      >
                        <i className="fa fa-eye-slash" aria-hidden="true"></i>
                      </InputGroup.Text>
                    </InputGroup.Append>
                    <div className="invalid-feedback">
                      Password must be 6 characters long It should contain a
                      number and <br></br> contain , uppercase and lowercase
                      letter
                    </div>
                  </InputGroup>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <a href="/">Forgot Password</a>
              </Col>
            </Row>
            <br />
            <Row>
              <Col>
                <Alert
                  variant="success"
                  className={!this.state.loginSuccess ? "hidden" : ""}
                >
                  {this.state.loginMessage || LOGIN_SUCCESS}
                </Alert>
                <Alert
                  variant="danger"
                  className={!this.state.loginError ? "hidden" : ""}
                >
                  {this.state.errorMessage || LOGIN_ERROR}
                </Alert>
              </Col>
            </Row>
            <Row>
              <Col>
                <Button
                  variant="outline-dark"
                  type="submit"
                  className="btn btn-primary"
                  size="lg"
                  block
                >
                  Sign In
                </Button>
              </Col>
            </Row>
            <br />
            <Row>
              <Col>
                <Link to="/register">New here? Create an account</Link>
              </Col>
            </Row>
          </form>
        </Container>
      </Container>
    );
  }
}

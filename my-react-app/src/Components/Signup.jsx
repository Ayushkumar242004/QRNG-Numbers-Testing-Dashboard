import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;



const client = axios.create({
  baseURL: "http://127.0.0.1:8000"
});

export const Signup = () => {
  const [currentUser, setCurrentUser] = useState(false);
  const [registrationToggle, setRegistrationToggle] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');

  useEffect(() => {
    client.get("/api/user")
      .then((res) => {
        setCurrentUser(true);
      })
      .catch((error) => {
        setCurrentUser(false);
      });
  }, []);

  const updateFormBtn = () => {
    if (registrationToggle) {
      document.getElementById("form_btn").innerHTML = "Register";
      setRegistrationToggle(false);
    } else {
      document.getElementById("form_btn").innerHTML = "Log in";
      setRegistrationToggle(true);
    }
  };

  const submitRegistration = (e) => {
    e.preventDefault();
    if (password !== confirmpassword) {
      alert("Passwords do not match");
      return;
    }
    client.post(
      "/api/register",
      {
        email: email,
        username: username,
        password: password
      }
    ).then((res) => {
      client.post(
        "/api/login",
        {
          email: email,
          password: password
        }
      ).then((res) => {
        setCurrentUser(true);
        window.location.href = 'http://localhost:3000'; // redirect to localhost:3000
      });
    });
  };

  const submitLogin = (e) => {
    e.preventDefault();
    client.post(
      "/api/login",
      {
        email: email,
        password: password
      }
    ).then((res) => {
      setCurrentUser(true);
      window.location.href = 'http://localhost:3000'; // redirect to localhost:3000
    });
  };

  const submitLogout = (e) => {
    e.preventDefault();
    client.post(
      "/api/logout",
      { withCredentials: true }
    ).then((res) => {
      setCurrentUser(false);
    });
  };

  if (currentUser) {
    return (
      <div>
        <div className="center">
          <h2>You're logged in!</h2>
        </div>
      </div>
    );
  }

  return (
    <div style={{ width:"300px",height:'auto',margin:'auto'}}>
      <div className="center">
        <Form onSubmit={registrationToggle ? submitRegistration : submitLogin}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          {registrationToggle && (
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
          )}
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          {registrationToggle && (
            <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                value={confirmpassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Group>
          )}
          <Button variant="primary" type="submit" id="form_btn">
            {registrationToggle ? "Register" : "Log in"}
          </Button>
          <Button variant="link" onClick={updateFormBtn}>
            {registrationToggle ? "Already have an account? Log in" : "Don't have an account? Register"}
          </Button>
        </Form>
      </div>
    </div>
  );
};
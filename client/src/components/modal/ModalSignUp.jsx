import React, { useContext, useState } from 'react'
import { Modal, Form, Button, Alert } from 'react-bootstrap'
import { useHistory } from 'react-router';

import { UserContext } from '../../config/UserContext/UserContext';

import { API, setAuthToken } from '../../config/api/api';

const ModalSignUp = (props) => {
  const [state, dispatch] = useContext(UserContext);

  const [message, setMessage] = useState(null);


  let history = useHistory();


  const onClickHere = () => {
    props.handleShowSignIn();
    props.onHide();
  }

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const { name, email, password } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };


  const handleOnSubmit = async (e) => {
    try {
      e.preventDefault();
      const config = {
        headers: {
          "Content-type": "application/json",
        }
      }

      const body = JSON.stringify(form);

      const response = await API.post("/register", body, config);

      if (response?.status === 200) {
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: response.data.data,
        });

        localStorage.setItem("token", response.data.data.token);
        setAuthToken(response.data.data.token);

        if (response.data.data.role === "admin") {
          history.push("/admin");
        } else {
          history.push("/home");
        }
      } else {
        const alert = (
          <Alert variant="danger" className="py-1">
            Email Alredy Used
          </Alert>
        );
        setMessage(alert);
      }
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1">
          Email Already Used
        </Alert>
      );
      setMessage(alert);
    }
  };

  return (
    <Modal show={props.show} onHide={props.onHide} centered>
      <Modal.Title>Sign Up</Modal.Title>
      <Modal.Body>
        {message && message && message}
        <div className="input-group-signup">
          <Form onSubmit={handleOnSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control className="input-signup" type="email" id="email" placeholder="Email" value={email} name="email" onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control className="input-signup" type="password" id="password" placeholder="Password" value={password} name="password" onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicFullname">
              <Form.Control className="input-signup" type="text" id="fullName" placeholder="Full Name" name="name" value={name} onChange={handleChange} />
            </Form.Group>
            <Button variant="danger" type="submit" className="btn-submit-signup">
              Sing Up
            </Button>
          </Form>
          <p className="text-have-account">Already have an account ? Klik <strong id="here" style={{ cursor: "pointer" }} onClick={onClickHere}>Here</strong></p>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default ModalSignUp

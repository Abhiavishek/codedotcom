import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import Login from "./Login";

const LoginCard = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate(); 

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = () => {
    navigate("/signup");
    handleClose();
  };

  return (
    <>
      <Button variant="light" className="border" onClick={handleShow}>
        Log in
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Login />
        </Modal.Body>
        {/* <Modal.Footer>
          <h4>Don't have an account?</h4>
          <Button variant="secondary" onClick={handleSubmit}>
            Signup
          </Button>
        </Modal.Footer> */}
      </Modal>
    </>
  );
};

export default LoginCard;

import React, { useReducer, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "RESET":
      return action.payload; 
    default:
      return state;
  }
};

function EditCustomer({ show, onClose, customer, onUpdate }) {
  // וודא שהמודל יתעדכן כל פעם שהלקוח משתנה
  const [state, dispatch] = useReducer(reducer, customer);

  // עדכון מצב הסטייט בכל פעם שהלקוח משתנה
  useEffect(() => {
    dispatch({ type: "RESET", payload: customer });
  }, [customer]);

  const handleInputChange = (field, value) => {
    dispatch({ type: "SET_FIELD", field, value });
  };

  // העדכון
  const handleUpdate = () => {
    onUpdate(state); 
    onClose(); 
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Customer</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="customerName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={state.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="customerEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={state.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="customerPhone">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              value={state.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleUpdate}>
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditCustomer;

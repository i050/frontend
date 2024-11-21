import React, { useContext, useState, useEffect } from "react";
import Customer from "../Customer";
import { ListGroup, Container, Row, Col } from "react-bootstrap";
import CustomersContext from "../../contexts/CustomersContext";
import EditCustomer from "../../components/Edit-customer";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import "./style.css";

function CustomersList() {
  const { customers, updateCustomer } = useContext(CustomersContext);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // פונקציה שנקראת בלחיצה על לקוח
  const handleCustomerClick = (customer) => {
    setSelectedCustomer(customer); // עדכון הלקוח שנבחר
    setShowModal(true); // פתיחת המודל
  };

  // עדכון לקוח בשרת
  const handleUpdate = (updatedCustomer) => {
    setIsLoading(true); // מתחילים את מצב הטעינה
    axios
      .put(
        `http://localhost:3000/api/customers/${updatedCustomer._id}`,
        updatedCustomer
      )
      .then((response) => {
        const updatedData = response.data;
        updateCustomer(updatedData); // עדכון הלקוח בקונטקסט
        setShowModal(false); // סגירת המודל אחרי עדכון
        setIsLoading(false); // סיימנו את מצב הטעינה
      })
      .catch((error) => {
        console.error("Error updating customer:", error);
        setIsLoading(false); // סיימנו את מצב הטעינה
      });
  };

  // בדיקה של lowding
  // const handleUpdate = (updatedCustomer) => {
  //   setIsLoading(true);  // מתחילים את מצב הטעינה

  //   // הוספת השהיה לדימוי זמן טעינה
  //   setTimeout(() => {
  //     axios.put(`http://localhost:3000/api/customers/${updatedCustomer._id}`, updatedCustomer)
  //       .then(response => {
  //         const updatedData = response.data;
  //         updateCustomer(updatedData);  // עדכון הקונטקסט
  //         setShowModal(false);
  //         setIsLoading(false);  // מסיימים את מצב הטעינה
  //       })
  //       .catch(error => {
  //         console.error('Error updating customer:', error);
  //         setIsLoading(false);  // מסיימים את מצב הטעינה במקרה של שגיאה
  //       });
  //   }, 2000);  // 2000 מיקרו שניות (2 שניות) - סימולציה של עיכוב
  // };

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col xs={12} md={8}>
          {isLoading ? (
            <div className="centered-spinner-container">
              <Spinner animation="grow" variant="warning" />
            </div>
          ) : (
            <ListGroup>
              {customers.map((customer) => (
                <ListGroup.Item
                  key={customer._id}
                  className="customer-item"
                  onClick={() => handleCustomerClick(customer)} // לחיצה על לקוח
                >
                  <Customer customerID={customer._id} />
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
      </Row>

      {/* מודל עבור עריכת לקוח */}
      {selectedCustomer && (
        <EditCustomer
          show={showModal}
          onClose={() => setShowModal(false)} // סגירת המודל
          customer={selectedCustomer} // שליחת הלקוח הנבחר למודל
          onUpdate={handleUpdate} // העברת פונקציה לעדכון הלקוח
        />
      )}
    </Container>
  );
}

export default CustomersList;

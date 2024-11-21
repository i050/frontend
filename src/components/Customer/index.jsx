import React, {useContext} from 'react';
import CustomersContext from '../../contexts/CustomersContext';

  function Customer({ customerID }) {
    // גישה ללקוחות מתוך הקונטקסט
    const { customers } = useContext(CustomersContext);
  //console.log(customers);
 // console.log(customerID);


  
    // חיפוש הלקוח לפי ID
    const customer = customers.find((customer) => customer._id === customerID);
  
    if (!customer) {
      return <div>לקוח לא נמצא</div>;
    }
  
    return (
      <div className="customer-card">
        <h3>{customer.name}</h3>
        <p>Email: {customer.email}</p>
        <p>Phone: {customer.phone}</p>
      </div>
    );
  }
  
export default Customer;

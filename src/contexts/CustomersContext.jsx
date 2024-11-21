import React, { createContext, useReducer } from 'react';
import axios from 'axios';

// יצירת הקונטקסט
const CustomersContext = createContext();

// הגדרת הפעולות
const ACTIONS = {
  SET_CUSTOMERS: 'SET_CUSTOMERS',
  UPDATE_CUSTOMER: 'UPDATE_CUSTOMER',
};

// ה-reducer שמטפל בהשפעות של הפעולות
const customersReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_CUSTOMERS:
      return action.payload;
    case ACTIONS.UPDATE_CUSTOMER:
      // עדכון הלקוח לפי ה-ID
      return state.map((customer) =>
        customer._id === action.payload._id ? { ...customer, ...action.payload } : customer
      );
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

// קומפוננטת Provider שתספק את הנתונים
export const CustomersProvider = ({ children }) => {
  const [customers, dispatch] = useReducer(customersReducer, []);

  // שליחה ל-API לקבלת הלקוחות
  const fetchCustomers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/customers');
      dispatch({ type: ACTIONS.SET_CUSTOMERS, payload: response.data });
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  // פונקציה לעדכון הלקוח
  const updateCustomer = (updatedCustomer) => {
    dispatch({ type: ACTIONS.UPDATE_CUSTOMER, payload: updatedCustomer });
  };

  // נטען את הלקוחות בהתחלה
  React.useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <CustomersContext.Provider value={{ customers, updateCustomer }}>
      {children}
    </CustomersContext.Provider>
  );
};

export default CustomersContext;

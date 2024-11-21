import React from "react";
import { CustomersProvider } from "./contexts/CustomersContext"
import Header from "./layout/Header";
import Sidebar from "./layout/Sidebar"
import Footer from "./layout/Footer";
import Routes from "./Routes";
import "./App.css";

function App() {
  return (
    <CustomersProvider>
    <div className="app-container">
      <Header />
      <div className="content">
      <Routes />
      </div>
      <Sidebar />
      <Footer />
    </div>
    </CustomersProvider>
  );
}

export default App;

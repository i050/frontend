import React from "react";
import { Nav, NavItem, NavLink } from "react-bootstrap";
import "./style.css"; // ייבוא קובץ ה-CSS של ה-Sidebar

function Sidebar() {
  return (
    <div className="sidebar">
      <Nav defaultActiveKey="/home" className="flex-column">
        <NavItem>
          <NavLink href="#something">Something</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#something">Something</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#something">Something</NavLink>
        </NavItem>
      </Nav>
    </div>
  );
}

export default Sidebar;

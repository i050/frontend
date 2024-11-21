import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "./style.css"

function Header() {
  return (
<>
<Navbar bg="dark" variant="dark" expand="lg">
<Container>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/customers">Customers</Nav.Link>
          </Nav>
        </Navbar.Collapse>
</Container>
</Navbar>
</>
  )
}

export default Header
import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import '../Style/Components/MainNavbar.css';

export default function MainNavbar() {
  return (
    <div className='sticky-top'>
      <Navbar collapseOnSelect expand="lg">
        <Container>
          <div>
            <Navbar.Brand href="home">
              <img
                src="\Images\logo2.png"
                width="140px"
                height="100px"
                className="nav__logo"
                alt="Brand logo"
              />
            </Navbar.Brand>
          </div>
          <div className='links'>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/home">Home</Nav.Link>
                <Nav.Link href="/mealplanning">Meal Planning</Nav.Link>
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/register">Register</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </div>
        </Container>
      </Navbar>
    </div>
  );
}

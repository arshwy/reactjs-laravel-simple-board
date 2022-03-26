import {Navbar, Nav, NavDropdown} from 'react-bootstrap';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Header = () => {
  const user = JSON.parse(localStorage.getItem('user-info'));
  const navigate = useNavigate();
  const logout = (e) => {
    e.preventDefault();
    axios.post('/api/logout')
    .then(response => {
      localStorage.removeItem('user-info');
      navigate('/login');
    })
    .catch( error => {
      console.log(error);
    });
  }
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">E-COMM</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {
            localStorage.getItem('user-info') ?
            <>
              <Nav.Link href="/add">Add Product</Nav.Link>
              <Nav.Link href="/">Search</Nav.Link>
              <NavDropdown title={user.name} id="basic-nav-dropdown">
                <NavDropdown.Item href="/#">{user.email}</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/#" onClick={logout}>Logout</NavDropdown.Item>
              </NavDropdown>
            </> :
            <>
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link href="/register">Register</Nav.Link>
            </>
          }
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}



export default Header

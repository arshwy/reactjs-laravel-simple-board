import {Navbar, Nav, NavDropdown, Form, FormControl, Button} from 'react-bootstrap';
import {Link , Routes, Route} from 'react-router-dom';


const Header = () => {
  const user = JSON.parse(localStorage.getItem('user-info'));
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
              <Nav.Link href="/update">Update Product</Nav.Link>
              <Nav.Link href="/">Search</Nav.Link>
              <NavDropdown title={user.name} id="basic-nav-dropdown">
                <NavDropdown.Item href="/#">{user.email}</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
              </NavDropdown>
            </> :
            <>
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link href="/register">Register</Nav.Link>
            </>
          }
        </Nav>
        <Form className="d-flex my-1">
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-success">Search</Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
}



export default Header

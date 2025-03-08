import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { userAuth } from "../store/store";

function CustomNavbar() {
  const [expanded, setExpanded] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useAtom(userAuth);
  const navigate = useNavigate();

  // Check authentication status on component mount
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsAuthenticated(!!token);
  }, []);

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("accessToken"); // Remove token
    setIsAuthenticated(false); // Update state
    navigate("/login"); // Redirect to login page
  };
  return (
    <Navbar expand="lg" className="bg-body-tertiary" expanded={expanded}>
      <Container>
        <Navbar.Brand as={NavLink} to="/" onClick={() => setExpanded(false)}>
          Milk Billing App
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={() => setExpanded(!expanded)}
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto" onClick={() => setExpanded(false)}>
            <Nav.Link as={NavLink} to="/add-customer">
              Add Customer
            </Nav.Link>
            <Nav.Link as={NavLink} to="/generate-bill">
              Generate Bill
            </Nav.Link>
            <Nav.Link as={NavLink} to="/add-payment">
              Add Payment
            </Nav.Link>
            {isAuthenticated ? (
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            ) : (
              <Nav.Link as={NavLink} to="/login">
                Login
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;

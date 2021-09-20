import React, { useState } from "react";
import { Navbar, Nav, Container, Alert } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import { useHistory } from "react-router-dom";

export default function Layout(props) {
  const { currentUser, logout } = useAuth();
  const [error, setError] = useState("");
  const history = useHistory();

  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <React.Fragment>
      {error && <Alert variant="danger">{error}</Alert>}
      <Navbar className="navigationbar" variant="dark">
        <Navbar.Brand href="/">Arithemtic stress test</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/test">Arithmetic test</Nav.Link>
          {currentUser ? <Nav.Link href="/my-data">My Data</Nav.Link> : null}
        </Nav>
        <Nav inline={+true}>
          {currentUser ? (
            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
          ) : (
            <React.Fragment>
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link href="/signup">Sign Up</Nav.Link>
            </React.Fragment>
          )}
        </Nav>
      </Navbar>
      <Container>{props.children}</Container>
    </React.Fragment>
  );
}

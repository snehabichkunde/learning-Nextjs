"use client";

import Link from "next/link";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { usePathname } from "next/navigation";

function NavBar() {
  const pathname = usePathname();

  return (
    <Navbar bg="primary" variant="dark" sticky="top" expand="sm" collapseOnSelect>
      <Container>
        <Navbar.Brand as={Link} href="/">
          NextJS 13.4 Image Gallery
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav>
            <Nav.Link
              as={Link}
              href="/static"
              active={pathname === "/static"} 
            >
              static
            </Nav.Link>
          
            <Nav.Link
              as={Link}
              href="/dynamic"
              active={pathname === "/dynamic"} 
            >
              dynamic
            </Nav.Link>
          
            <Nav.Link
              as={Link}
              href="/ISR"
              active={pathname === "/ISR"} 
            >
              ISR
            </Nav.Link>

            <NavDropdown title="Topics" id="topics-dropdown">
                <NavDropdown.Item as={Link} href="/topics/apple">Apple</NavDropdown.Item>
                <NavDropdown.Item as={Link} href="/topics/tree">Tree</NavDropdown.Item>
                <NavDropdown.Item as={Link} href="/topics/coding">Coding</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;

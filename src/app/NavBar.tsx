"use client";

import Link from "next/link";
import { Container, Navbar, Nav } from "react-bootstrap";
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
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;

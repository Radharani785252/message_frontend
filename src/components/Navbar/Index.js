import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Collapse,
} from "reactstrap";

function NavbarTop(props) {
  const [collapsed, setCollapsed] = useState(true);
  const toggleNavbar = () => setCollapsed(!collapsed);

  return (
    <div>
      <Navbar color="dark" dark expand="lg">
        <div className="container">
          <NavbarBrand href="/">Home Page</NavbarBrand>
          <NavbarToggler onClick={toggleNavbar} />
          <Collapse isOpen={!collapsed} navbar>
            <Nav className="ms-auto" navbar>
              <NavItem>
                <NavLink href="/sendonesms" className="nav-link">
                  One Message
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/sendbulksms" className="nav-link">
                  Bulk Message
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </div>
      </Navbar>
    </div>
  );
}

export default NavbarTop;

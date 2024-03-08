import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function Header() {
    const navigate = useNavigate();

    const handleLogout = () => {
        const auth = getAuth();
        signOut(auth)
            .then(() => {
                console.log('User signed out');
                navigate('/');
            })
            .catch((error) => {
                console.error('Error signing out:', error);
            });
    };

    return (
        <Navbar expand="lg" bg="light" variant="light">
            <Container style={{ zIndex: '2' }}>
                <Navbar.Brand href="#home">PartTimeMatch</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/home">Home</Nav.Link>
                        <Nav.Link href="/search">Search</Nav.Link>
                        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/team">Your team</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/contactus">Contactus</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Button onClick={handleLogout} variant="outline-danger">Logout</Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;

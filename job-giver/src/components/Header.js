import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function Header() {
    const [darkMode, setDarkMode] = useState(false); // State to toggle dark mode
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
        <Navbar expand="lg" className={darkMode ? "bg-dark-500" : "bg-light"}>
            <Container style={{zIndex:'2'}}>
                <Navbar.Brand href="#home" className={darkMode ? "text-white" : "text-black"}>PartTimeMatch</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/home" className={darkMode ? "text-white" : "text-black"}>Home</Nav.Link>
                        <Nav.Link href="/search" className={darkMode ? "text-white" : "text-black"}>Search</Nav.Link>
                        <NavDropdown title="Dropdown" id="basic-nav-dropdown" className={darkMode ? "text-white" : "text-black"}>
                            <NavDropdown.Item href="/team" className={darkMode ? "text-white" : "text-black"}>Your team</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/contactus" className={darkMode ? "text-white" : "text-black"}>Contactus</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Button onClick={handleLogout} variant="outline-danger">Logout</Button>
                    <Button onClick={() => setDarkMode(!darkMode)} variant={darkMode ? "outline-light" : "outline-dark"}>{darkMode ? "Light Mode" : "Dark Mode"}</Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;

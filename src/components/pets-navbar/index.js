import React from 'react';
import { Container } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import { Navbar } from "react-bootstrap";
import Logo from "./img/sick-af-dog.png";
import './style/pets-navbar.css';

const pets = [
    "Benji",
    "Mittens",
    "Jeff",
    "Finn"
]

const PetsNavbar = () => {
    return (
        <Navbar>
            <Container>
                <Navbar.Brand className="nav-item" href="/">
                    <img
                        alt="Duck Logo"
                        src={Logo}
                        height="100"
                        id="logo"
                        className="d-inline-block align-top"
                    />
                </Navbar.Brand>
                {pets.map(p => <Nav.Link className="nav-item" key={p} href={`/pet?name=${p}`}>{p}</Nav.Link>)}
            </Container>
        </Navbar>
    )
}

export default PetsNavbar;
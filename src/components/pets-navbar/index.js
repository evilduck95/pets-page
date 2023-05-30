import React from 'react';
import { Container } from "react-bootstrap";
import { Navbar } from "react-bootstrap";
import { NavLink } from 'react-router-dom';
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
                <Navbar.Brand className="nav-item" href={`${process.env.BASE_URL}`}>
                    <img
                        alt="Duck Logo"
                        src={Logo}
                        height="100"
                        id="logo"
                        className="d-inline-block align-top"
                    />
                </Navbar.Brand>
                {pets.map(p => <NavLink className="nav-item" key={p} aria-current="page" to={`/pet?name=${p}`}>{p}</NavLink>)}
            </Container>
        </Navbar>
    );
}

export default PetsNavbar;
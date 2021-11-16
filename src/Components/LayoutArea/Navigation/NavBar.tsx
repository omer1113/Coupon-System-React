import "./NavBar.css";
import React, { Component, useState } from 'react';
import {
    Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink
} from 'reactstrap';
import logo from "../../../Assets/admin.jpg";

import logoImage from "../../../Assets/logo.png";
import { Link } from 'react-router-dom';
import { LinkContainer } from "react-router-bootstrap";
import store from "../../../Redux/Store";
import { logoutAction } from "../../../Redux/AuthState";

interface NavBar3State {
    userLogged : boolean;
    isOpen : boolean;
}

class navBar extends Component<{}, NavBar3State> {
    public constructor(props: {}) {
        super(props);
        this.state = {
            userLogged: store.getState().authState.isLogged,
            isOpen: false
        };
        store.subscribe(() => {
            this.setState({
                userLogged: store.getState().authState.isLogged
            });
        })
    }

    private toggle = () => this.setState({isOpen: !this.state.isOpen});

    public render(): JSX.Element {
        const navItems = ["Food", "Electricity", "Restaurant", "Vacation"];
        if (this.state.userLogged){
            return (
                <div>
                    <Navbar color="dark" dark expand="md" fixed="true">
                        <LinkContainer to="/home">
                            <NavbarBrand as={Link} to="/home">
                                <img src={logo} alt="logo" width="100" height="100"/>
                                Coupon System</NavbarBrand>
                        </LinkContainer>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="mx-auto" navbar>
                            {navItems.map(item => (
                                <NavItem>
                                    <LinkContainer to={`/category/${item.toUpperCase()}`}>
                                        <NavLink> {item} </NavLink>
                                    </LinkContainer>
                                </NavItem>
                            ))}
                        </Nav>
                        <Nav className="justify-content-end" style={{ width: "100%" }}>
                            <NavItem>
                                <LinkContainer to={`/${store.getState().authState.user.userType.toLowerCase()}`} >
                                    <NavLink > Menu </NavLink>
                                </LinkContainer>
                            </NavItem>
                            <NavItem>
                                <LinkContainer to="/home">
                                    <NavLink onClick={()=> {store.dispatch(logoutAction())}}> Logout </NavLink>
                                </LinkContainer>
                            </NavItem>
                        </Nav>
                        </Collapse>
                    </Navbar>
                </div>
            );
            }else{
                return (
                    <div>
                        <Navbar color="dark" dark expand="md" fixed="true">
                            <LinkContainer to="/home">
                                <NavbarBrand as={Link} to="/home">
                                    <img src={logoImage} alt="logoImage" width="30" height="30"/>
                                    Coupon System
                                </NavbarBrand>
                            </LinkContainer>
                            <NavbarToggler onClick={this.toggle} />
                            <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="mr-auto" navbar>
                                {navItems.map(item => (
                                    <NavItem>
                                        <LinkContainer to={`/category/${item.toUpperCase()}`}>
                                            <NavLink> {item} </NavLink>
                                        </LinkContainer>
                                    </NavItem>
                                ))}
                            </Nav>
                            <Nav className="justify-content-end" style={{ width: "100%" }}>
                                <NavItem>
                                    <LinkContainer to="/login">
                                        <NavLink> Login </NavLink>
                                    </LinkContainer>
                                </NavItem>
                            </Nav>
                            </Collapse>
                        </Navbar>
                    </div>
                );
         }
    }
}
 
export default navBar;


import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../styles";
import {
  NavbarContainer,
  LeftContainer,
  RightContainer,
  NavbarExtendedContainer,
  NavbarInnerContainer,
  NavbarLinkContainer,
  NavbarLink,
  Logo,
  OpenLinksButton,
  NavbarLinkExtended,
} from "../styles/NavBar.style";
import LogoImg from "../assets/logo.png";

function NavBar({ user, setUser }) {
  function handleLogoutClick() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null);
      }
    });
  }
  const [extendNavbar, setExtendNavbar] = useState(false);
  return (
    <NavbarContainer extendNavbar={extendNavbar}>
      <NavbarInnerContainer>
        <LeftContainer>
          <NavbarLinkContainer>
            <NavbarLink to="/"> Home</NavbarLink>
            <NavbarLink to="/app-routines"> Exercises</NavbarLink>
            <NavbarLink to="/app-workouts"> My Workouts</NavbarLink>
            <NavbarLink to="/new"> Create Workout</NavbarLink>
            <OpenLinksButton
              onClick={() => {
                setExtendNavbar((curr) => !curr);
              }}
            >
              {extendNavbar ? <>&#10005;</> : <> &#8801;</>}
            </OpenLinksButton>
          </NavbarLinkContainer>
        </LeftContainer>
        <RightContainer>
        <NavbarLinkExtended to="/">
          <Button variant="outline" onClick={handleLogoutClick}>
            Logout
          </Button>
        </NavbarLinkExtended>
        </RightContainer>
      </NavbarInnerContainer>
      {extendNavbar && (
        <NavbarExtendedContainer>
          <NavbarLinkExtended to="/"> Home</NavbarLinkExtended>
          <NavbarLinkExtended to="/app-routines"> Exercises</NavbarLinkExtended>
          <NavbarLinkExtended to="/app-workouts">
            {" "}
            My Workouts
          </NavbarLinkExtended>
          <NavbarLinkExtended to="/new"> Create Workout</NavbarLinkExtended>
        </NavbarExtendedContainer>
      )}
    </NavbarContainer>
  );
}

export default NavBar;

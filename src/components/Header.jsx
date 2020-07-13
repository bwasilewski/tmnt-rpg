import React from 'react'
import {
  Container,
  Navbar,
  NavbarBrand,
  NavbarItem,
  NavbarMenu,
  NavbarStart,
  Title } from 'bloomer'

const Header = props => {

  return (
    <Container>
      <Navbar>
        <NavbarBrand>
          <NavbarItem>
            <Title isSize={1}>TMNT RPG</Title>
          </NavbarItem>
        </NavbarBrand>
        <NavbarMenu>
          <NavbarStart>
            <NavbarItem href="/">Home</NavbarItem>
            <NavbarItem href="/about">About</NavbarItem>
            <NavbarItem href="/rules">Rules</NavbarItem>
            <NavbarItem href="/glossary">Glossary</NavbarItem>
            <NavbarItem href="/admin">Admin</NavbarItem>
            <NavbarItem href="/animals">Animals</NavbarItem>
          </NavbarStart>
        </NavbarMenu>
      </Navbar>
    </Container>
  )
}

export default Header

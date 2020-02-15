import React from 'react'
import {
  Navbar,
  NavbarBrand,
  NavbarItem,
  NavbarMenu,
  NavbarStart,
  Title } from 'bloomer'

const Header = props => {

  return (
    <Navbar>
      <NavbarBrand>
        <NavbarItem>
          <Title isSize={1}>TMNT RPG</Title>
        </NavbarItem>
      </NavbarBrand>
      <NavbarMenu>
        <NavbarStart>
          <NavbarItem href="/home">Home</NavbarItem>
          <NavbarItem href="/about">About</NavbarItem>
        </NavbarStart>
      </NavbarMenu>
    </Navbar>
  )
}

export default Header
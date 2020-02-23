import React from 'react'
import { Column, Columns, Container, Title } from 'bloomer'
import TextField from '../../components/TextField'
import AttributeBonusField from '../../components/AttributeBonusField'

const Admin = props => {
  const handleSubmit = ev => {
    ev.preventDefault()
  }

  return (
    <Container>
      <Title isSize={2}>Admin</Title>
      <Columns>
        <Column isSize={'1/3'}>
        <Title isSize={3}>Animal</Title>
          <form onSubmit={handleSubmit}>
            <TextField label="Name" name="name" />
            <TextField label="Minimum" name="minimum" />
            <TextField label="Maximum" name="maximum" />
            <TextField label="Description" name="description" />
            <TextField label="Size Level" name="size_level" />
            <TextField label="Length" name="length" />
            <TextField label="Weight" name="weight" />
            <TextField label="Build" name="build" />
            <TextField label="Bio-E" name="bio_e" />

            <AttributeBonusField />

            {/* Attribute bonuses here */}

            {/* Human features here */}
          </form>
        </Column>
      </Columns>
    </Container>
  )
}

export default Admin;

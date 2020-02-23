import React, { useState } from 'react'
import Page from '../../components/Page'
import NewAnimal from '../../components/form/NewAnimal'
import { CreateAnimal } from '../../events/Animal'
import { Button, Columns, Column, Title } from 'bloomer'

const Animals = props => {
  const [edit, setEdit] = useState(false)

  const handleCreateClick = ev => setEdit(true)

  const createNewAnimal = ev => {
    ev.preventDefault()
    const { target } = ev
    const { elements } = target

    let postData = { }

    for ( let el of elements ) {
      el.tagName !== 'BUTTON' && (postData[el.name] = el.value)
    }

    CreateAnimal(postData)
      .then(response => console.log('New Animal: ', response))
      .catch(error => console.error(error))
  }

  return (
    <Page>
      <Title isSize={2}>Animals</Title>
      <Columns>
        <Column isSize="1/4">
          <Title isSize={3}>List</Title>
          <ul>
            <li>Animal 1</li>
            <li>Animal 2</li>
            <li>Animal 3</li>
          </ul>
        </Column>
        <Column>
          <Button onClick={handleCreateClick}>Create New</Button>
          { edit && <NewAnimal handleSubmit={createNewAnimal} /> }
        </Column>
      </Columns>
    </Page>
  )
}

export default Animals;

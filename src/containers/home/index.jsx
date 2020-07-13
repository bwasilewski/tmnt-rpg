import React, { useState } from 'react'
import {
  Container,
  Columns,
  Column,
  Control,
  Field,
  Input,
  Label,
  Select } from 'bloomer'
import uniqid from 'uniqid'

import Stats from '../../components/Stats'

import {
  ANIMAL_MAP,
  ORGANIZATION_MAP,
  MUTATION_MAP,
  EDUCATION_MAP,
  rollCharacter } from '../../game/Character'

const Home = props => {
  const [name, setName] = useState(null)
  const [category, setCategory] = useState(null)
  const [animal, setAnimal] = useState(null)
  const [mutation, setMutation] = useState(null)
  const [organization, setOrganization] = useState(null)
  const [education, setEducation] = useState(null)
  const [occupation, setOccupation] = useState(null)

  const changeName = ev => {
    const { target } = ev
    const newName = target.value
    setName(newName)
  }

  const changeCategory = ev => {
    const { target } = ev
    const newCategory = ANIMAL_MAP.find(cat => cat.category === target.value)
    setCategory(newCategory)
  }

  const changeAnimal = ev => {
    const { target } = ev
    const newAnimal = category.types.find(type => type.name === target.value)
    setAnimal(newAnimal)
  }

  const changeMutation = ev => {
    const { target } = ev
    const newMutation = MUTATION_MAP.find(type => type.type === target.value)
    setMutation(newMutation)
  }

  const changeOrganization = ev => {
    const { target } = ev
    const newOrg = ORGANIZATION_MAP.find(org => org.name === target.value)
    setOrganization(newOrg)
  }

  const changeEducation = ev => {
    const { target } = ev
    const newEdu = EDUCATION_MAP.find(edu => edu.name === target.value)
    setEducation(newEdu)
  }

  const changeOccupation = ev => {
    const { target } = ev
    setOccupation(target.value)
  }

  const handleRollCharacter = ev => {
    ev.preventDefault()
    const newCharacter = rollCharacter()
    console.log('Character: ', newCharacter)
  }

  return (
    <Container>
      <Columns isCentered>
        <Column isSize="1/3">
          <button onClick={handleRollCharacter}>Roll Character</button>
          {/* <div>
            <Field>
              <Label>Character Name</Label>
              <Control>
                <Input onChange={changeName} type="text" value={name !== null ? name : ''} />
              </Control>
            </Field>

            <Field>
              <Label>Occupation</Label>
              <Control>
                <Input onChange={changeOccupation} type="text" value={occupation !== null ? occupation : ''} />
              </Control>
            </Field>
          </div> */}
          <div>
            <Field>
              <Label>Animal Type</Label>
              <Control>
                <Select onChange={changeCategory} value={category !== null ? category.category : ''}>
                  <option>Select</option>
                  { ANIMAL_MAP.map(category => <option key={uniqid()} value={category.category}>{category.category}</option>)}
                </Select>
              </Control>
            </Field>
          </div>

          { category && (
            <div>
              <Field>
                <Label>Species</Label>
                <Control>
                  <Select onChange={changeAnimal} value={animal !== null ? animal.name : ''}>
                    <option>Select</option>
                    { category.types.map(type => <option key={uniqid()} value={type.name}>{type.name}</option>)}
                  </Select>
                </Control>
              </Field>
            </div>
          )}

          { animal && (
            <div>
              <Field>
                <Label>Mutation</Label>
                <Control>
                  <Select onChange={changeMutation} value={mutation !== null ? mutation.type : ''}>
                    <option>Select</option>
                    { MUTATION_MAP.map(type => <option key={uniqid()} value={type.type}>{type.type}</option>)}
                  </Select>
                </Control>
              </Field>
            </div>
          )}

          { mutation && (
            <div>
              <Field>
                <Control>
                  <Label>Organization</Label>
                    <Select onChange={changeOrganization} value={organization !== null ? organization.name : ''}>
                      <option>Select</option>
                      { ORGANIZATION_MAP.map(org => <option key={uniqid()} value={org.name}>{org.name}</option>)}
                    </Select>
                </Control>
              </Field>
            </div>
          )}

          { organization && (
            <div>
              <Field>
                <Label>Education</Label>
                <Control>
                  <Select onChange={changeEducation} value={education !== null ? education.name : ''}>
                    <option>Select</option>
                    { EDUCATION_MAP.map(edu => <option key={uniqid()} value={edu.name}>{edu.name}</option>)}
                  </Select>
                </Control>
              </Field>
            </div>
          )}
        </Column>
        <Column isSize="2/3">
          { category && (
            <Stats
              category={category}
              animal={animal}
              mutation={mutation}
              org={organization}
              education={education} />
          )}
        </Column>
      </Columns>
    </Container>
  )
}

export default Home

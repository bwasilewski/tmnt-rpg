import React from 'react'
import { Button, Card, CardContent, Control, Label, Field, Input, Select, TextArea } from 'bloomer'

const NewAnimal = props => {
  const { handleSubmit } = props

  const BaseField = ({name, label, children}) => (
    <Field>
      <Label htmlFor={name}>{label}</Label>
      <Control>
        { children }
      </Control>
    </Field>
  )

  const TextField = props => (
    <BaseField {...props}>
      <Input type="text" name={props.name} defaultValue={props.defaultValue} />
    </BaseField>
  )

  const NumberField = props => (
    <BaseField {...props}>
      <Input type="number" name={props.name} defaultValue={props.defaultValue} />
    </BaseField>
  )

  const SelectField = props => (
    <BaseField {...props}>
      <Select name={props.name}>
        { props.children }
      </Select>
    </BaseField>
  )

  const TextAreaField = props => (
    <BaseField {...props}>
      <TextArea name={props.name} defaultValue={props.defaultValue} />
    </BaseField>
  )

  const AttributeBonus = props => (
    <>
      <SelectField name="attribute" label="Attribute">
        <option>IQ</option>
        <option>ME</option>
        <option>MA</option>
        <option>PS</option>
        <option>PP</option>
        <option>PE</option>
        <option>PB</option>
        <option>Spd</option>
      </SelectField>
      <NumberField name="bonus" label="Bonus" />
    </>
  )

  return (
    <form onSubmit={handleSubmit}>
      <TextField name="name" label="Name" defaultValue="Armadillo" />

      <SelectField name="category" label="Category">
        <option>Urban Animal</option>
        <option>Rural Animal</option>
        <option>Wild Animal</option>
        <option>Wild Bird</option>
        <option>Zoo Animal</option>
      </SelectField>

      <NumberField name="minimum" label="Minimum" defaultValue={86} />
      <NumberField name="maximum" label="Maximum" defaultValue={88} />

      <TextAreaField name="description" label="Description" defaultValue="lorem ipsum dolor sit amet" />

      <NumberField name="size_level" label="Size Level" defaultValue={5} />
      <TextField name="length" label="Length" defaultValue="2 feet, plus a foot of tail" />
      <TextField name="weight" label="Weight" defaultValue="20 to 30 pounds" />
      <TextField name="build" label="Build" defaultValue="Medium" />
      <NumberField name="bio_e" label="Bio Energy" defaultValue={60} />

      {/* <Card>
        <CardContent>
          <AttributeBonus />
        </CardContent>
      </Card> */}

      <Button type="submit">Submit</Button>
    </form>
  )
}

export default NewAnimal

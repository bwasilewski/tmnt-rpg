import React from 'react'
import { Field, Label, Control, Input } from 'bloomer'

const TextField = props => {
  const { label, name } = props
  return (
    <Field>
      <Label htmlFor={name}>{label}</Label>
      <Control>
        <Input type="text" name={name} />
      </Control>
    </Field>
  )
}

export default TextField;

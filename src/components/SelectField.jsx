import React from 'react'
import { Label, Select } from 'bloomer'

const SelectField = props => {
  const { name, label } = props
  return (
    <>
      <Label htmlFor={name}>{label}</Label>
      <Select name={name}>
        { props.children }
      </Select>
    </>
  )
}

export default SelectField;

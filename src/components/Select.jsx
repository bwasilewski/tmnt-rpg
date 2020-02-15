import React from 'react'
import uniqid from 'uniqid'

const Select = props => {
  return (
    <select name={props.name} id={props.name}>
      { props.items.map(item => <option key={uniqid()}>{item}</option>)}
    </select>
  )
}

export default Select;

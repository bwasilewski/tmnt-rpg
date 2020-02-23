import React from 'react'
import SelectField from './SelectField'
import TextField from './TextField'

const AttributeBonusField = props => {
  return (
    <div>
      <div>
        <SelectField name="attribute" label="Attribute">
          <option value="IQ">IQ</option>
          <option value="ME">ME</option>
          <option value="MA">MA</option>
          <option value="PS">PS</option>
          <option value="PP">PP</option>
          <option value="PE_a">PE_a</option>
          <option value="PE_b">PE_b</option>
          <option value="PB">PB</option>
          <option value="Spd">Spd</option>
        </SelectField>

        <TextField name="bonus" label="Bonus" />
      </div>
    </div>
  )
}

export default AttributeBonusField

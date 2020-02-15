import React from 'react'

const AnimalStats = props => {
  const { animal } = props
  const { name, description, size_level, length, weight, build } = animal
  return (
    <ul>
      <li><strong>Description: </strong>{description}</li>
      <li><strong>Size Level: </strong>{size_level}</li>
      <li><strong>Length: </strong>{length}</li>
      <li><strong>Weight: </strong>{weight}</li>
      <li><strong>Build: </strong>{build}</li>
    </ul>
  )
}

export default AnimalStats;

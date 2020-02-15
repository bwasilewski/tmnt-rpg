import React from 'react'
import { Box } from 'bloomer'
import AnimalStats from './AnimalStats'

const Stats = props => {
  return (
    <Box>
      <ul>
        { props.category && <li><strong>Category</strong>: { props.category.category }</li> }
        { props.animal && <li><strong>Animal</strong>: { props.animal.name }</li> }
        { props.mutation && <li><strong>Mutation</strong>: { props.mutation.type }</li> }
        { props.org && <li><strong>Organization</strong>: { props.org.name }</li> }
        { props.education && <li><strong>Education</strong>: { props.education.description }</li> }
      </ul>
      { props.animal && <AnimalStats animal={props.animal} /> }
    </Box>
  )
}

export default Stats

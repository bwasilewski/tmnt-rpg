import React from 'react'
import { Box } from 'bloomer'

const Stats = props => {
  return (
    <Box>
      <ul>
        { props.category && <li>Category: { props.category.category }</li> }
        { props.animal && <li>Animal: { props.animal.name }</li> }
        { props.mutation && <li>Mutation: { props.mutation.type }</li> }
        { props.org && <li>Organization: { props.org.name }</li> }
        { props.education && <li>Education: { props.education.description }</li> }
      </ul>
    </Box>
  )
}

export default Stats

import React from 'react'
import { Card, Title } from 'bloomer'

const Term = props => {
  const { description, title } = props
  return (
    <article>
      <Card>
        <Title isSize={3}>{title}</Title>
        {props.children}
      </Card>
    </article>
  )
}
 
export default Term;